import type { PaginatedUniversities, University } from '../types/auth';
import { apiRequest } from './http';

export async function fetchUniversitiesPage(
  page = 1,
  pageSize = 100,
): Promise<PaginatedUniversities> {
  return apiRequest<PaginatedUniversities>(
    `/api/v1/student-community/university/?page=${page}&page_size=${pageSize}`,
  );
}

export async function fetchAllUniversities(): Promise<University[]> {
  const first = await fetchUniversitiesPage(1, 100);
  const all = [...first.results];
  const totalPages = first.total_pages;

  const pageFetches: Promise<PaginatedUniversities>[] = [];
  for (let page = 2; page <= totalPages; page += 1) {
    pageFetches.push(fetchUniversitiesPage(page, 100));
  }

  const rest = await Promise.all(pageFetches);
  for (const batch of rest) {
    all.push(...batch.results);
  }

  return all.sort((a, b) => b.priority - a.priority || a.name.localeCompare(b.name));
}
