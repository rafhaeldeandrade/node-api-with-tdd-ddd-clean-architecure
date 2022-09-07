import { SlugGenerator } from '@/data/contracts/utils/slug-generator'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class GenerateUrlSlug implements SlugGenerator {
  generate(value: string): string {
    return value
  }
}
