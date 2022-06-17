#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS build-env

COPY ./*.csproj ./ClassifiedAds.VueWeb/
RUN dotnet restore

COPY . ./
RUN dotnet publish ./ClassifiedAds.VueWeb.csproj -c Release -o out

FROM base AS final
COPY --from=build-env ./out .

ENTRYPOINT ["dotnet", "ClassifiedAds.VueWeb.dll"]