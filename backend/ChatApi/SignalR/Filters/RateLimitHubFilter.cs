using System.Threading.RateLimiting;
using ChatApi.SignalR.RateLimiting;
using Microsoft.AspNetCore.SignalR;

namespace ChatApi.Hubs
{
    public class RateLimitHubFilter : IHubFilter
    {

        private readonly SignalRRateLimiter _limiter;

        public RateLimitHubFilter(SignalRRateLimiter limiter)
        {
            _limiter = limiter;
        }

        public async ValueTask<object?> InvokeMethodASync(
            HubInvocationContext context,
            Func<HubInvocationContext, ValueTask<object?>> next)
        {
            var userKey =
                context.Context.UserIdentifier ??
                context.Context.ConnectionId;

            using var lease = _limiter.AttemptAcquire(userKey);

            if (!lease.IsAcquired)
            {
                if (lease.TryGetMetadata(
                    MetadataName.RetryAfter, out var retryAfter))
                {
                    throw new HubException(
                        $"Rate limit exceeded. Retry after {retryAfter.TotalSeconds:F1}s"
                    );

                    throw new HubException("Rate limit exceeded");
                }
            }

            return await next(context);
        }



    }
}