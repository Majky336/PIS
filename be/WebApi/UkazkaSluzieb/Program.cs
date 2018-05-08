using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UkazkaSluzieb.ServiceReference1;

namespace UkazkaSluzieb
{
    class Program
    {
        static void Main(string[] args)
        {
            var serviceClient = new Team024KnihaPortTypeClient();

            var result = serviceClient.getAll();
        }
    }
}
