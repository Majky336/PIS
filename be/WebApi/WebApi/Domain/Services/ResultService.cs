using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Domain.Factory.Interface;
using WebApi.Domain.ServiceRepositories.Interfaces;
using WebApi.Models.ViewModels;

namespace WebApi.Domain.Services
{
    public class ResultService : IResultService
    {
        private readonly IKnihaServiceRepository _knihaServiceRepository;
        private readonly IVytlacokServiceRepository _vytlacokServiceRepository;
        private readonly IErrorServiceRepository _errorServiceRepository;
        private readonly IChybaFactory _chybaFactory;
        private readonly IPouzivatelServiceRepository _pouzivatelServiceRepository;

        public ResultService(IKnihaServiceRepository knihaServiceRepository,
            IVytlacokServiceRepository vytlacokServiceRepository, IErrorServiceRepository errorServiceRepository, IChybaFactory chybaFactory, IPouzivatelServiceRepository pouzivatelServiceRepository)
        {
            _knihaServiceRepository = knihaServiceRepository;
            _vytlacokServiceRepository = vytlacokServiceRepository;
            _errorServiceRepository = errorServiceRepository;
            _chybaFactory = chybaFactory;
            _pouzivatelServiceRepository = pouzivatelServiceRepository;
        }

        public void DoStuf(List<ResultViewModel> resulstViewModel)
        {
            if (resulstViewModel == null || resulstViewModel.Count == 0)
                return;

            var copyId = resulstViewModel.First().CopyId;
            var copy = _vytlacokServiceRepository.GetById(copyId);
            var book = _knihaServiceRepository.GetById(copy.kniha_id);

            var usersPoints = new Dictionary<int, int>();

            foreach (var resultViewModel in resulstViewModel)
            {
                switch (resultViewModel.PropertyName)
                {
                    case "Author":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            book.autor = resultViewModel.NewValue;
                        }
                        break;
                    case "CopyName":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            copy.name = resultViewModel.NewValue;
                        }
                        break;
                    case "Genre":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            book.zaner = resultViewModel.NewValue;
                        }
                        break;
                    case "Publishers":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            copy.vydavatelstvo = resultViewModel.NewValue;
                        }
                        break;
                    case "ISBN":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            book.ISBN = resultViewModel.NewValue;
                        }
                        break;
                    case "Language":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            copy.jazyk = resultViewModel.NewValue;
                        }
                        break;
                    case "NumberOfPages":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            if (int.TryParse(resultViewModel.NewValue, out var number))
                                copy.pocetStran = number;
                        }
                        break;
                    case "ReleaseFormat":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            copy.formatVydania = resultViewModel.NewValue;
                        }
                        break;
                    case "BindingType":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            copy.typVazby = resultViewModel.NewValue;
                        }
                        break;
                    case "YearOfPublication":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            if (DateTime.TryParse(resultViewModel.NewValue, out var date))
                                book.rokVydania = date;
                        }
                        break;
                }

                if (usersPoints.ContainsKey(resultViewModel.UserId))
                {
                    usersPoints[resultViewModel.UserId] += 5; 
                }
                else
                {
                    usersPoints.Add(resultViewModel.UserId, 5);
                }

                var errors = _errorServiceRepository.GetErrorsByCopyId(copyId);
                var error = errors.FirstOrDefault(er => er.name == resultViewModel.PropertyName && er.pouzivatel_id == resultViewModel.UserId && !er.vyhodnotena);

                if (error == null) continue;
                error.novyUdaj = resultViewModel.NewValue;
                error.datVyhodnotenia = DateTime.Now;
                error.potvrdena = resultViewModel.IsAccepted;
                error.vyhodnotena = true; 

                var errorForUpdate = _chybaFactory.GetChyba(error, resultViewModel.AdminId);
                _errorServiceRepository.UpdateError(errorForUpdate);
            }

            _knihaServiceRepository.UpdateKniha(book);
            _vytlacokServiceRepository.UpdateVytlacok(copy);

            foreach (var userId in usersPoints.Keys)
            {
                var user = _pouzivatelServiceRepository.GetPouzivatelById(userId);
                user.body += usersPoints[userId];
                _pouzivatelServiceRepository.SaveUpdatedPouzivatel(user);
            }
        }
    }
}