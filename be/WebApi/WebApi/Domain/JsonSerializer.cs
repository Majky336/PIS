using System;
using System.Web.Script.Serialization;

namespace WebApi.Domain
{
    public class JsonSerializer
    {

        public string GetJson(Object T)
        {
            var js = new JavaScriptSerializer();
            string result = js.Serialize(T);
            return result;
        }
    }
}