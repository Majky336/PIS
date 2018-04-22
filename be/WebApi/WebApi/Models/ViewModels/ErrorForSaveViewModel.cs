namespace WebApi.Models.ViewModels
{
    public class ErrorForSaveViewModel
    {
        public int UserId { get; set; }
        public int CopyId { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public string PropertyName { get; set; }
    }
}