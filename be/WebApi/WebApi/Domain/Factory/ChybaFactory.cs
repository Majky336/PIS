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

        public Chyba GetChyba(Chybas chyba, int adminId)
        {
            var result = new Chyba
            {
                id = chyba.id,
                vytlacok_id = chyba.vytlacok_id,
                pouzivatel_id = chyba.pouzivatel_id,
                name = chyba.name,
                novyUdaj = chyba.novyUdaj,
                staryUdaj = chyba.staryUdaj,
                datZalozenia = chyba.datZalozenia,
                potvrdena = chyba.potvrdena,
                vyhodnotena = chyba.vyhodnotena,
                admin_id = adminId,
                datVyhodnotenia = DateTime.Now
            };

            return result;
        }
    }
}