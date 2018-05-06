using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApi.Domain.Factory.Interface;
using WebApi.Domain.ServiceRepositories;
using WebApi.Domain.ServiceRepositories.Interfaces;
using WebApi.Domain.Services.Interfaces;
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
        private readonly IEmailServiceRepository _emailServiceRepository;

        public ResultService(IKnihaServiceRepository knihaServiceRepository, IVytlacokServiceRepository vytlacokServiceRepository, IErrorServiceRepository errorServiceRepository,
            IChybaFactory chybaFactory, IPouzivatelServiceRepository pouzivatelServiceRepository, IEmailServiceRepository emailServiceRepository)
        {
            _knihaServiceRepository = knihaServiceRepository;
            _vytlacokServiceRepository = vytlacokServiceRepository;
            _errorServiceRepository = errorServiceRepository;
            _chybaFactory = chybaFactory;
            _pouzivatelServiceRepository = pouzivatelServiceRepository;
            _emailServiceRepository = emailServiceRepository;
        }

        public void DoStuf(List<ResultViewModel> resulstViewModel)
        {
            if (resulstViewModel == null || resulstViewModel.Count == 0)
                return;

            var copyId = resulstViewModel.First().CopyId;
            var copy = _vytlacokServiceRepository.GetById(copyId);
            var book = _knihaServiceRepository.GetById(copy.kniha_id);

            var usersPoints = new Dictionary<int, int>();
            var usersMessages = new Dictionary<int, StringBuilder>();

            foreach (var resultViewModel in resulstViewModel)
            {
                if (!usersMessages.ContainsKey(resultViewModel.UserId))
                {
                    usersMessages.Add(resultViewModel.UserId, new StringBuilder().AppendLine("Dobrý deň,").AppendLine(""));
                }

                if (!usersPoints.ContainsKey(resultViewModel.UserId))
                {
                    usersPoints.Add(resultViewModel.UserId, 0);
                }

                switch (resultViewModel.PropertyName)
                {
                    case "Author":
                        if (resultViewModel.IsAccepted || resultViewModel.IsChangedByadmin)
                        {
                            book.autor = resultViewModel.NewValue;
                        }

                        var authorMessage = GetEmailMessage(copy.name, "Autor", resultViewModel.NewValue, resultViewModel.IsAccepted, 5);
                        usersMessages[resultViewModel.UserId].AppendLine(authorMessage);

                        if (resultViewModel.IsAccepted)
                        {
                            usersPoints[resultViewModel.UserId] += 5;
                        }
                        break;
                    case "CopyName":
                        if (resultViewModel.IsAccepted || resultViewModel.IsChangedByadmin)
                        {
                            copy.name = resultViewModel.NewValue;
                        }

                        var copyNameMessage = GetEmailMessage(copy.name, "Názov výtlačku", resultViewModel.NewValue, resultViewModel.IsAccepted, 5);
                        usersMessages[resultViewModel.UserId].AppendLine(copyNameMessage);

                        if (resultViewModel.IsAccepted)
                        {
                            usersPoints[resultViewModel.UserId] += 5;
                        }
                        break;
                    case "Genre":
                        if (resultViewModel.IsAccepted || resultViewModel.IsChangedByadmin)
                        {
                            book.zaner = resultViewModel.NewValue;
                        }

                        var genreMessage = GetEmailMessage(copy.name, "Žáner", resultViewModel.NewValue, resultViewModel.IsAccepted, 5);
                        usersMessages[resultViewModel.UserId].AppendLine(genreMessage);

                        if (resultViewModel.IsAccepted)
                        {
                            usersPoints[resultViewModel.UserId] += 5;
                        }
                        break;
                    case "Publishers":
                        if (resultViewModel.IsAccepted || resultViewModel.IsChangedByadmin)
                        {
                            copy.vydavatelstvo = resultViewModel.NewValue;
                        }

                        var publishersMessage = GetEmailMessage(copy.name, "Vydavateľstvo", resultViewModel.NewValue, resultViewModel.IsAccepted, 5);
                        usersMessages[resultViewModel.UserId].AppendLine(publishersMessage);

                        if (resultViewModel.IsAccepted)
                        {
                            usersPoints[resultViewModel.UserId] += 5;
                        }
                        break;
                    case "Isbn":
                        if (resultViewModel.IsAccepted || resultViewModel.IsChangedByadmin)
                        {
                            book.ISBN = resultViewModel.NewValue;
                        }

                        var isbnMessage = GetEmailMessage(copy.name, "ISBN", resultViewModel.NewValue, resultViewModel.IsAccepted, 5);
                        usersMessages[resultViewModel.UserId].AppendLine(isbnMessage);

                        if (resultViewModel.IsAccepted)
                        {
                            usersPoints[resultViewModel.UserId] += 5;
                        }
                        break;
                    case "Language":
                        if (resultViewModel.IsAccepted || resultViewModel.IsChangedByadmin)
                        {
                            copy.jazyk = resultViewModel.NewValue;
                        }

                        var languageMessage = GetEmailMessage(copy.name, "Jazyk", resultViewModel.NewValue, resultViewModel.IsAccepted, 5);
                        usersMessages[resultViewModel.UserId].AppendLine(languageMessage);

                        if (resultViewModel.IsAccepted)
                        {
                            usersPoints[resultViewModel.UserId] += 5;
                        }
                        break;
                    case "Description":
                        if (resultViewModel.IsAccepted || resultViewModel.IsChangedByadmin)
                        {
                            book.popis = resultViewModel.NewValue;
                        }

                        var descriptionMessage = GetEmailMessage(copy.name, "Popis", resultViewModel.NewValue, resultViewModel.IsAccepted, 5);
                        usersMessages[resultViewModel.UserId].AppendLine(descriptionMessage);

                        if (resultViewModel.IsAccepted)
                        {
                            usersPoints[resultViewModel.UserId] += 5;
                        }
                        break;
                    case "NumberOfPages":
                        var number = 0;

                        if (resultViewModel.IsAccepted || resultViewModel.IsChangedByadmin)
                        {
                            if (int.TryParse(resultViewModel.NewValue, out number))
                            {
                                copy.pocetStran = number;
                            }
                        }

                        var accesorNumberOfPages = number != 0 && resultViewModel.IsAccepted;
                        var numberOfPagesMessage = GetEmailMessage(copy.name, "Počet strán", resultViewModel.NewValue, accesorNumberOfPages, 5);
                        usersMessages[resultViewModel.UserId].AppendLine(numberOfPagesMessage);

                        if (resultViewModel.IsAccepted)
                        {
                            usersPoints[resultViewModel.UserId] += 5;
                        }
                        break;
                    case "ReleaseFormat":
                        if (resultViewModel.IsAccepted || resultViewModel.IsChangedByadmin)
                        {
                            copy.formatVydania = resultViewModel.NewValue;
                        }

                        var releaseFormatMessage = GetEmailMessage(copy.name, "Formát vydania", resultViewModel.NewValue, resultViewModel.IsAccepted, 5);
                        usersMessages[resultViewModel.UserId].AppendLine(releaseFormatMessage);

                        if (resultViewModel.IsAccepted)
                        {
                            usersPoints[resultViewModel.UserId] += 5;
                        }
                        break;
                    case "BindingType":
                        if (resultViewModel.IsAccepted || resultViewModel.IsChangedByadmin)
                        {
                            copy.typVazby = resultViewModel.NewValue;
                        }

                        var bindingTypeMessage = GetEmailMessage(copy.name, "Typ väzby", resultViewModel.NewValue, resultViewModel.IsAccepted, 5);
                        usersMessages[resultViewModel.UserId].AppendLine(bindingTypeMessage);

                        if (resultViewModel.IsAccepted)
                        {
                            usersPoints[resultViewModel.UserId] += 5;
                        }
                        break;
                    case "YearOfPublication":
                        var date = DateTime.MinValue;
                        if (resultViewModel.IsAccepted || resultViewModel.IsChangedByadmin)
                        {
                            if (DateTime.TryParse(resultViewModel.NewValue, out date))
                                book.rokVydania = date;
                        }

                        var accesorYearOfPublication = date != DateTime.MinValue && resultViewModel.IsAccepted;
                        var yearOfPublicationMessage = GetEmailMessage(copy.name, "Rok vydania", resultViewModel.NewValue, accesorYearOfPublication, 5);
                        usersMessages[resultViewModel.UserId].AppendLine(yearOfPublicationMessage);

                        if (resultViewModel.IsAccepted)
                        {
                            usersPoints[resultViewModel.UserId] += 5;
                        }
                        break;
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

            foreach (var userPoint in usersPoints)
            {
                var user = _pouzivatelServiceRepository.GetPouzivatelById(userPoint.Key);
                user.body += userPoint.Value;
                _pouzivatelServiceRepository.SaveUpdatedPouzivatel(user);
            }

            foreach (var message in usersMessages)
            {
                var userEmail = _pouzivatelServiceRepository.GetPouzivatelById(message.Key).email;

                message.Value.AppendLine("");
                message.Value.AppendLine("S pozdravom,");
                message.Value.AppendLine("Vaša knižnica");

                _emailServiceRepository.SendEmail(userEmail, "Rozhodnutie o návrhoch na opravenie údajov", message.ToString());
            }
        }

        private static string GetEmailMessage(string copyName, string propertyName, string newValue, bool accesor, int points)
        {
            return accesor
                ? $"Vami navrhnutá hodnota ({newValue}) na výtlačku {copyName} a položke s názvom {propertyName} bola úspešne schválená a bolo Vám pridaných {points} bodov."
                : $"Vami navrhnutá hodnota ({newValue}) na výtlačku {copyName} a položke s názvom {propertyName} bola zamietnutá.";
        }
    }
}