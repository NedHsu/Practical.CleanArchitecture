namespace ClassifiedAds.Application
{
    public enum CUDActionType : int
    {
        Delete = -1,
        Update = 0,
        Create = 1,
    }

    public interface ICommandAction
    {
        CUDActionType Action { get; }
    }
}
