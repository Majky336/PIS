using System;
using WebApi.Models.ViewModels;
using WebApi.PouzivatelWsdlService;

namespace WebApi.Domain.Services.Interfaces
{
    public interface IMembershipService
    {
        Pouzivatel DoStuff(MembershipForUpdateViewModel membershipForUpdateViewModel);
    }
}