import {Company} from "../models/entities/Company";
import {NotFoundError} from "../errors/NotFoundError";

export class CompanyManager {

    constructor() {
    }

    public async createCompany(companyId: string, name: string, addressId: string) {
        const newCompany = new Company({
            companyId,
            name,
            addressId
        });
        return newCompany.save();
    }

    public async updateCompany(companyId: string, name: string, addressId: string) {
        const company = await Company.find<Company>({where: {companyId: companyId}});
        if(company) {
            company.companyId = companyId;
            company.name = name;
            company.addressId = addressId;
        
            return company.save();
        } else {
            throw new NotFoundError("No company found with that id");
        }
    }

    public async deleteCompany(companyId) {
        const company = await Company.find<Company>({where: {companyId: companyId}});
        if(company) {
            return company.destroy();
        } else {
            throw new NotFoundError("No company found with that id");
        }
    }
}