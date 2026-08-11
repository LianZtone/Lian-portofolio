import figmaProject1 from '@/assets/img/GraceStudio-RTLM Brand Kit Cinematic Editorial System.png'
import figmaProject3 from '@/assets/img/Cinematic Brand Kit Presentation for GraceStudio-RTLM.png'
import apotekBeranda from '@/assets/img/.prototype 1/Beranda - Apotek Sehat Jaya.png'
import tokoBeranda from '@/assets/img/.prototype 2/Beranda - Toko Kita.png'

export interface ProjectLink {
  label: string
  url: string
  icon?: string
}

export interface Project {
  title: string
  description: string
  badges: string[]
  links: ProjectLink[]
}

export interface DesignWork {
  title: string
  description: string
  badges: string[]
  image: string
  linkText?: string
  linkUrl?: string
}

export interface CategoryGroup {
  icon: string
  title: string
  works: DesignWork[]
}

const figmaPrototypeUrl =
  'https://www.figma.com/design/VcxRHG5sFrG4fQOJ2a8LyM/prototype?node-id=3079-2&t=yK5jgRGUjJi275fh-1'

export const featuredProjects: Project[] = [
  {
    title: 'Web-Comic',
    description:
      'Portal komik digital dan comic reader berbasis Laravel — katalog, rak baca, riwayat, komentar, vote, dan admin panel lengkap.',
    badges: ['Laravel', 'PHP', 'Vite', 'Tailwind CSS', 'DaisyUI', 'Blade'],
    links: [{ label: 'GitHub', url: 'https://github.com/LianZtone/web-comic', icon: 'fa-brands fa-github' }],
  },
  {
    title: 'My Film Favorites',
    description:
      'Koleksi film favorit interaktif — carousel dengan poster, rating bintang, dan tombol favorit, deployed via GitHub Pages.',
    badges: ['HTML', 'CSS / SCSS', 'JavaScript', 'GitHub Pages'],
    links: [
      { label: 'GitHub', url: 'https://github.com/LianZtone/my-film-favorits', icon: 'fa-brands fa-github' },
      { label: 'Live Demo', url: 'https://lianZtone.github.io/my-film-favorits/' },
    ],
  },
  {
    title: 'Scriptoria',
    description:
      'Ruang digital pribadi untuk menulis dan mengelola cerita — editor bab, publikasi, RBAC, audit log, dan backup/export data.',
    badges: ['Vue 3', 'Vite', 'Pinia', 'Vue Router', 'Tailwind CSS', 'Node.js', 'SQLite'],
    links: [{ label: 'GitHub', url: 'https://github.com/LianZtone/scriptoria', icon: 'fa-brands fa-github' }],
  },
  {
    title: 'GreenLife Web',
    description: 'GreenLife adalah aplikasi web frontend bertema gaya hidup sehat dan produk organik.',
    badges: ['Vue 3', 'Vite', 'Vue Router 4', 'SCSS / Sass', 'SweetAlert2', 'Vue SweetAlert2', 'animate.css'],
    links: [{ label: 'GitHub', url: 'https://github.com/LianZtone/GreenLife-Web', icon: 'fa-brands fa-github' }],
  },
]

export const designCategories: CategoryGroup[] = [
  {
    icon: 'fa-brands fa-figma',
    title: 'Figma UI/UX Design',
    works: [
      {
        title: 'Apotek Sehat Jaya',
        description: 'Desain web apotek — beranda, layanan & produk, tentang kami, dan halaman kontak.',
        badges: ['Figma', 'Web Design', 'Prototype'],
        image: apotekBeranda,
        linkText: 'Open in Figma',
        linkUrl: figmaPrototypeUrl,
      },
      {
        title: 'Toko Kita',
        description: 'Desain web toko — beranda, katalog produk, detail produk, dan halaman kontak.',
        badges: ['Figma', 'Web Design', 'Prototype'],
        image: tokoBeranda,
        linkText: 'Open in Figma',
        linkUrl: figmaPrototypeUrl,
      },
    ],
  },
  {
    icon: 'fa-solid fa-palette',
    title: 'Canva Creative Works',
    works: [
      {
        title: 'Social Media Brand Kit',
        description: 'Complete social media template pack untuk konsistensi branding',
        badges: ['Canva', 'Social Media', 'Branding'],
        image: figmaProject1,
        linkText: 'Templates: Coming Soon',
      },
      {
        title: 'Business Presentation',
        description: 'Professional presentation deck dengan animation dan data visualization',
        badges: ['Canva', 'Presentation', 'Animation'],
        image: figmaProject3,
        linkText: 'Slides: Coming Soon',
      },
    ],
  },
]
