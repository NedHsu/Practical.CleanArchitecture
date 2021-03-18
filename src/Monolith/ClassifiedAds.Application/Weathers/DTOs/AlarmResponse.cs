using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Weathers.DTOs
{
    public class AlarmResponse
    {
        public string Success { get; set; }
        public AlarmRecord Records { get; set; }
    }

    public class AlarmRecord
    {
        public List<AlarmLocation> Location { get; set; }
    }

    public class AlarmLocation
    {
        public float Geocode { get; set; }
        public string LocationName { get; set; }
        public AlarmHazardConditions HazardConditions { get; set; }
    }

    public class AlarmHazardConditions
    {
        public List<AlarmHazard> Hazards { get; set; }
    }

    public class AlarmHazard
    {
        public AlarmHazardInfo Info { get; set; }
        public AlarmHazardValidTime ValidTime { get; set; }
    }

    public class AlarmHazardInfo
    {
        public string Language { get; set; }
        public string Phenomena { get; set; }
        public string Significance { get; set; }
    }

    public class AlarmHazardValidTime
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}
