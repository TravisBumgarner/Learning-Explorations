import { Entity, Column, PrimaryColumn } from "typeorm";


@Entity()
export class Inventory {

    @PrimaryColumn()
    sku: string;

    @Column()
    quantity: number

}
