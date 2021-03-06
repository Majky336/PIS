﻿using System.Collections.Generic;
using WebApi.VytlacokWsdlReference;

namespace WebApi.Domain.ServiceRepositories.Interfaces
{
    public interface IVytlacokServiceRepository
    {
        List<Vytlacoks> GetAll();
        Vytlacok GetById(int id);
        void UpdateVytlacok(Vytlacok vytlacok);
    }
}