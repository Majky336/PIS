using System;
using WebApi.Domain.ServiceRepositories.Interfaces;
using WebApi.Domain.Services.Interfaces;
using WebApi.Models.ViewModels;
using WebApi.PouzivatelWsdlService;

namespace WebApi.Domain.Services
{
    public class MembershipService : IMembershipService
    {
        private readonly IPouzivatelServiceRepository _pouzivatelServiceRepository;

        public MembershipService(IPouzivatelServiceRepository pouzivatelServiceRepository)
        {
            _pouzivatelServiceRepository = pouzivatelServiceRepository;
        }

        public Pouzivatel DoStuff(MembershipForUpdateViewModel membershipForUpdateViewModel)
        {
            var user = _pouzivatelServiceRepository.GetPouzivatelById(membershipForUpdateViewModel.UserId);

            if (user.body < membershipForUpdateViewModel.Points)
            {
                return null;
            }

            user.body -= membershipForUpdateViewModel.Points;
            if (user.platneClenske == DateTime.MinValue)
            {
                user.platneClenske = DateTime.Now;
            }

            user.platneClenske = user.platneClenske.AddMonths(3);

            _pouzivatelServiceRepository.SaveUpdatedPouzivatel(user);

            return user;
        }
    }
}