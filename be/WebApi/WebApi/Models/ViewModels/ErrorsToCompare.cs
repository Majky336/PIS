using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models.ViewModels
{
    public class ErrorsToCompare
    {
        public int UserID { get; set; }
        public int CopyID { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public string PropertyName { get; set; }
    }
}