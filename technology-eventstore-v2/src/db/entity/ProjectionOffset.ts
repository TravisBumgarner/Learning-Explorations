import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class ProjectionOffset {
    @PrimaryColumn({ nullable: false })
    id: string

    @Column({ nullable: false })
    reviewerId: string

    @Column({ nullable: false })
    worksheetId: string

}