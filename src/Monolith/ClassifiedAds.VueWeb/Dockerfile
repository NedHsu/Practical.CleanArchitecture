FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
WORKDIR ./
COPY ["ClassifiedAds.VueWeb.csproj", "ClassifiedAds.VueWeb/"]
RUN dotnet restore "ClassifiedAds.VueWeb/ClassifiedAds.VueWeb.csproj"
COPY . .
WORKDIR "./"
RUN dotnet build "ClassifiedAds.VueWeb.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ClassifiedAds.VueWeb.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ClassifiedAds.VueWeb.dll"]