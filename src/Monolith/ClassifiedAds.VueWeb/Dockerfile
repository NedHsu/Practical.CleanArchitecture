#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS build-env
WORKDIR /ClassifiedAds.Monolith

COPY ./ClassifiedAds.VueWeb/*.csproj ./ClassifiedAds.VueWeb/

COPY . ./
RUN dotnet publish ./ClassifiedAds.VueWeb.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /ClassifiedAds.Monolith
COPY --from=build-env ./out .

ENTRYPOINT ["dotnet", "ClassifiedAds.VueWeb.dll"]