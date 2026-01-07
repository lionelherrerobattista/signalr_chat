using System.Threading.RateLimiting;

namespace ChatApi.SignalR.RateLimiting
{
    public class SignalRRateLimiter
    {
        private readonly PartitionedRateLimiter<string> _limiter;

        public SignalRRateLimiter()
        {
            _limiter = PartitionedRateLimiter.Create<string, string>(key =>
                RateLimitPartition.GetTokenBucketLimiter(
                    partitionKey: key,
                    factory: _ => new TokenBucketRateLimiterOptions
                    {
                        TokenLimit = 10,
                        TokensPerPeriod = 10,
                        ReplenishmentPeriod = TimeSpan.FromSeconds(1),
                        QueueLimit = 0,
                        AutoReplenishment = true
                    }
            ));
        }

        public RateLimitLease AttemptAcquire(string key)
        {
            return _limiter.AttemptAcquire(key, 1);
        }
    }
}