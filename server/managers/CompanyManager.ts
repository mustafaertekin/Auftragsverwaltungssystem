import {Company} from "../models/entities/Company";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";

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

    public async updateCompany(companyId: string, name: string, addressId: string): Promise <Company> {
        const company = await Company.find<Company>({where: {companyId}});
        if(company) {
            company.name = name || company.name;
            company.addressId = addressId || company.addressId;
        
            return company.save();
        } else {
            logger.error("No company/branch found");
            throw new NotFoundError("No company found with that id");
        }
    }

    public async deleteCompany(companyId: string): Promise<Company | null> {
        const company = await Company.find<Company>({where: {companyId}});
        if(company) {
            await company.destroy();
            return company;
        } else {
            logger.error("No company/branch found");
            throw new NotFoundError("No company found with that id");
        }
    }
}