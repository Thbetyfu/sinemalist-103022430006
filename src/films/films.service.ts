import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import filmsData from '../films.json' with { type: 'json' };
import { CreateFilmDto } from './dto/create-film.dto.js';
import { UpdateFilmDto } from './dto/update-film.dto.js';
import { Film } from './entities/film.entity.js';

@Injectable()
export class FilmsService {
  // Data disimpan di memori (salinan dari films.json)
  private films: Film[] = filmsData.map((film) => ({ ...film }));

  constructor() {
    // Pemeriksaan awal: tampilkan data film di terminal
    console.log(`Data films.json berhasil dimuat (${this.films.length} film):`);
    console.table(this.films);
  }

  findAll(ditonton?: string): Film[] {
    if (ditonton === 'true') {
      return this.films.filter((film) => film.sudahDitonton === true);
    }
    if (ditonton === 'false') {
      return this.films.filter((film) => film.sudahDitonton === false);
    }
    return this.films;
  }

  findOne(id: string): Film {
    const film = this.films.find((item) => item.id === id);
    if (!film) {
      throw new NotFoundException(`Film dengan id ${id} tidak ditemukan`);
    }
    return film;
  }

  create(createFilmDto: CreateFilmDto): Film {
    const filmBaru: Film = {
      id: randomUUID(),
      judul: createFilmDto.judul,
      genre: createFilmDto.genre,
      tahun: createFilmDto.tahun,
      rating: createFilmDto.rating,
      sudahDitonton: createFilmDto.sudahDitonton ?? false,
    };
    this.films.push(filmBaru);
    return filmBaru;
  }

  update(id: string, updateFilmDto: UpdateFilmDto): Film {
    const film = this.findOne(id); // otomatis 404 jika tidak ada
    Object.assign(film, updateFilmDto);
    return film;
  }

  remove(id: string): { message: string } {
    const index = this.films.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Film dengan id ${id} tidak ditemukan`);
    }
    this.films.splice(index, 1);
    return { message: `Film dengan id ${id} berhasil dihapus` };
  }
}
