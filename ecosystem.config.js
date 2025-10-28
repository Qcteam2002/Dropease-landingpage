module.exports = {
  apps: [{
    name: 'dropease-landing',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/dropease-landing',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001  // Port riêng cho Dropease, tránh conflict với apps khác (có thể đổi 3002, 3003... nếu 3001 bị chiếm)
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
  }]
}

// IMPORTANT: Check port 3001 trước khi dùng:
// sudo lsof -i :3001
// Nếu bị chiếm, đổi sang port khác (3002, 3003, etc.)

