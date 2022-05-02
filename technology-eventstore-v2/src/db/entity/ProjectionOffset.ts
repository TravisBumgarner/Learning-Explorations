import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class ProjectionOffset {
    @PrimaryColumn({ nullable: false, type:'bigint' })
    offset: bigint

    @PrimaryColumn({ nullable: false })
    stream: string
}