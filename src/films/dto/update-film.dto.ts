import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto.js';

// Semua field dari CreateFilmDto menjadi opsional, aturan validasinya tetap berlaku
export class UpdateFilmDto extends PartialType(CreateFilmDto) {}
