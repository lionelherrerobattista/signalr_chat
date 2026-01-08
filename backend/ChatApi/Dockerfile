FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

COPY ["ChatApi.csproj", "./"] 
RUN dotnet restore "ChatApi.csproj"

COPY . .

RUN dotnet build "ChatApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ChatApi.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final

WORKDIR /app

EXPOSE 8080
EXPOSE 8081

COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# run as non-root user for security
USER $APP_UID

ENTRYPOINT [ "dotnet",  "ChatApi.dll"]