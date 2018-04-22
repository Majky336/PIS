using System;
using WebApi.ChybaWsdlService;
using WebApi.Domain.Factory.Interface;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Factory
{
    public class ChybaFactory : IChybaFactory
    {
        public Chyba CreateChyba(ErrorForSaveViewModel errorForSaveViewModel)
        {
            var result = new Chyba
            {
                vytlacok_id = errorForSaveViewModel.CopyId,
                pouzivatel_id = errorForSaveViewModel.UserId,
                name = errorForSaveViewModel.PropertyName,
                novyUdaj = errorForSaveViewModel.NewValue,
                staryUdaj = errorForSaveViewModel.OldValue,
                datZalozenia = DateTime.Now,
                potvrdena = false,
                vyhodnotena = false,
                admin_id = 0,
                datVyhodnotenia = DateTime.MinValue
            };

            return result;
        }
    }
}