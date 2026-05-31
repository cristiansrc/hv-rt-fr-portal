#!/bin/bash

# Script para limpiar archivos del índice de git que deberían estar en .gitignore

echo "Verificando archivos que deberían ser ignorados..."

# Archivos y carpetas comunes que deberían estar en .gitignore
FILES_TO_REMOVE=(
  ".next"
  "out"
  "node_modules"
  "coverage"
  ".env.local"
  ".env"
  "*.log"
  ".DS_Store"
  "Thumbs.db"
  "*.tsbuildinfo"
  "next-env.d.ts"
  ".eslintcache"
  ".stylelintcache"
  ".vercel"
  ".swc"
)

echo ""
echo "Archivos que están siendo rastreados pero deberían ser ignorados:"
echo ""

for item in "${FILES_TO_REMOVE[@]}"; do
  if git ls-files --error-unmatch "$item" &>/dev/null; then
    echo "  - $item (está siendo rastreado)"
  fi
done

echo ""
echo "Para eliminar estos archivos del índice de git (pero mantenerlos localmente), ejecuta:"
echo ""
echo "  git rm -r --cached .next"
echo "  git rm -r --cached out"
echo "  git rm -r --cached node_modules"
echo "  git rm -r --cached coverage"
echo "  git commit -m 'Remove ignored files from git tracking'"
echo ""
