namespace WebApi.Models.ViewModels
{
    public class ResultViewModel : ErrorToCompare
    {
        public bool IsAccepted { get; set; }
        public bool IsChangedByadmin { get; set; }
        public int AdminId { get; set; }
    }
}