using System;
using System.Web.Script.Serialization;

namespace WebApi.Domain
{
    public class JsonSerializer
    {

        public string GetJson(Object T)
        {
            var js = new JavaScriptSerializer();
            var result = js.Serialize(T);
            return result;
        }
    }
}