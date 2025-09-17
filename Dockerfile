# Menggunakan image resmi Nginx dari Docker Hub
FROM nginx:alpine

# Menyalin semua file dari folder proyek saat ini ke folder web root di dalam kontainer
COPY . /usr/share/nginx/vue