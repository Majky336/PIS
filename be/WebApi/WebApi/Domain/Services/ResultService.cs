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

                switch (resultViewModel.PropertyName)
                {
                    case "Author":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            book.autor = resultViewModel.NewValue;
                        }

                        usersMessages[resultViewModel.UserId].AppendLine(resultViewModel.IsAccepted
                            ? $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Autor bola úspešne schválená."
                            : $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Autor bola zamietnutá.");

                        break;
                    case "CopyName":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            copy.name = resultViewModel.NewValue;
                        }

                        usersMessages[resultViewModel.UserId].AppendLine(resultViewModel.IsAccepted
                            ? $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Názov výtlačku bola úspešne schválená."
                            : $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Názov výtlačku bola zamietnutá.");
                        break;
                    case "Genre":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            book.zaner = resultViewModel.NewValue;
                        }

                        usersMessages[resultViewModel.UserId].AppendLine(resultViewModel.IsAccepted
                            ? $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Žáner bola úspešne schválená."
                            : $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Žáner bola zamietnutá.");
                        break;
                    case "Publishers":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            copy.vydavatelstvo = resultViewModel.NewValue;
                        }

                        usersMessages[resultViewModel.UserId].AppendLine(resultViewModel.IsAccepted
                            ? $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Vydavateľstvo bola úspešne schválená."
                            : $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Vydavateľstvo bola zamietnutá.");
                        break;
                    case "ISBN":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            book.ISBN = resultViewModel.NewValue;
                        }

                        usersMessages[resultViewModel.UserId].AppendLine(resultViewModel.IsAccepted
                            ? $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom ISBN bola úspešne schválená."
                            : $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom ISBN bola zamietnutá.");
                        break;
                    case "Language":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            copy.jazyk = resultViewModel.NewValue;
                        }

                        usersMessages[resultViewModel.UserId].AppendLine(resultViewModel.IsAccepted
                            ? $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Jazyk bola úspešne schválená."
                            : $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Jazyk bola zamietnutá.");
                        break;
                    case "NumberOfPages":
                        var number = 0;

                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            if (int.TryParse(resultViewModel.NewValue, out number))
                            {
                                copy.pocetStran = number;
                            }
                        }

                        usersMessages[resultViewModel.UserId].AppendLine(number != 0 && resultViewModel.IsAccepted
                            ? $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Počet strán bola úspešne schválená."
                            : $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Počet strán bola zamietnutá.");

                        break;
                    case "ReleaseFormat":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            copy.formatVydania = resultViewModel.NewValue;
                        }

                        usersMessages[resultViewModel.UserId].AppendLine(resultViewModel.IsAccepted
                            ? $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Formát vydania bola úspešne schválená."
                            : $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Formát Vydania bola zamietnutá.");
                        break;
                    case "BindingType":
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            copy.typVazby = resultViewModel.NewValue;
                        }

                        usersMessages[resultViewModel.UserId].AppendLine(resultViewModel.IsAccepted
                            ? $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Typ väzby bola úspešne schválená."
                            : $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Typ väzby bola zamietnutá.");
                        break;
                    case "YearOfPublication":
                        var date = DateTime.MinValue;
                        if (resultViewModel.IsAccepted || resultViewModel.ChangedByadmin)
                        {
                            if (DateTime.TryParse(resultViewModel.NewValue, out date))
                                book.rokVydania = date;
                        }

                        usersMessages[resultViewModel.UserId].AppendLine(date != DateTime.MinValue && resultViewModel.IsAccepted
                            ? $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Rok vydania bola úspešne schválená."
                            : $"Vami navrhnutá hodnota ({resultViewModel.NewValue}) na výtlačku {copy.name} a položke s názvom Rok vydania bola zamietnutá.");
                        break;
                }

                if (resultViewModel.IsAccepted && usersPoints.ContainsKey(resultViewModel.UserId))
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
    }
}