using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Weathers.DTOs
{
    public class EarthquakeResponse
    {
        public string Success { get; set; }
        public EarthquakeRecord Records { get; set; }
    }

    public class EarthquakeRecord
    {
        public string DatasetDescription { get; set; }
        public List<Earthquake> Earthquake { get; set; }
    }

    public class Earthquake
    {
        public int EarthquakeNo { get; set; }
        public string ReportColor { get; set; }
        public string ReportContent { get; set; }
        public string ReportImageURI { get; set; }
        public string ReportRemark { get; set; }
        public string ReportType { get; set; }
        public string ShakemapImageURI { get; set; }
        public string Web { get; set; }
        public EarthquakeInfo EarthquakeInfo { get; set; }
        public EarthquakeValue Intensity { get; set; }
    }

    public class EarthquakeInfo
    {
        public string OriginTime { get; set; }
        public string Source { get; set; }
        public EarthquakeValue Depth { get; set; }
        public EarthquakeInfoMagnitude Magnitude { get; set; }
        public EarthquakeInfoEpiCenter EpiCenter { get; set; }
    }

    public class EarthquakeValue
    {
        public string Unit { get; set; }
        public float Value { get; set; }
    }

    public class EarthquakeInfoMagnitude
    {
        public string MagnitdueType { get; set; }
        public float MagnitudeValue { get; set; }
    }

    public class EarthquakeInfoEpiCenter
    {
        public string Location { get; set; }
        public EarthquakeIntensity EpiCenterLat { get; set; }
        public EarthquakeShakingArea EpiCenterLon { get; set; }
    }

    public class EarthquakeIntensity
    {
        public List<EarthquakeShakingArea> ShakingArea { get; set; }
    }

    public class EarthquakeShakingArea
    {
        public string AreaDesc { get; set; }
        public string AreaName { get; set; }
        public string InfoStatus { get; set; }
        public EarthquakeValue AreaIntensity { get; set; }
        public List<EqStation> EqStation { get; set; }
    }

    public class EqStation
    {
        public EarthquakeValue Azimuth { get; set; }
        public EarthquakeValue Distance { get; set; }
        public EarthquakeValue StationIntensity { get; set; }
        public EarthquakeValue StationLat { get; set; }
        public EarthquakeValue StationLon { get; set; }
        public string InfoStatus { get; set; }
        public string StationCode { get; set; }
        public string StationName { get; set; }
        public string WaveImageURI { get; set; }
        public EqStationPg Pga { get; set; }
        public EqStationPg Pgv { get; set; }
    }

    public class EqStationPg
    {
        public float EwComponent { get; set; }
        public float IntScaleValue { get; set; }
        public float NsComponent { get; set; }
        public float VComponent { get; set; }
        public string Unit { get; set; }
    }
}
