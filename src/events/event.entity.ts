import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, length: 100 })
  name: string;
  @Column()
  description: string;
  @Column()
  when: Date;
  @Column()
  address: string;
}
