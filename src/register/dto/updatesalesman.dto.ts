import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesmanDTO } from './createsalesman.dto';

export class UpdateSalesmanDTO extends PartialType(CreateSalesmanDTO) {}
