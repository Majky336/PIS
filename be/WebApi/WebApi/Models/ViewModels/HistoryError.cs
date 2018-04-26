using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models.ViewModels
{
    public class HistoryError
    {
        public string CopyName { get; set; }
        public string NewValue { get; set; }
        public string PropertyName { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Confirmed { get; set; }
        public bool Resolved { get; set; }
    }
}