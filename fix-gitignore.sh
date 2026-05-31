#!/bin/bash

# Script para eliminar archivos del índice de git que deberían ser ignorados
# Este script NO elimina los archivos de tu disco, solo los quita del tracking de git

echo "=========================================="
echo "Limpiando archivos del índice de git"
echo "=========================================="
echo ""

# Verificar si estamos en un repositorio git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "Error: No estás en un repositorio git"
    exit 1
fi

echo "Eliminando node_modules del índice..."
git rm -r --cached node_modules/ 2>/dev/null || echo "  node_modules no estaba siendo rastreado"

echo "Eliminando .next del índice..."
git rm -r --cached .next/ 2>/dev/null || echo "  .next no estaba siendo rastreado"

echo "Eliminando out del índice..."
git rm -r --cached out/ 2>/dev/null || echo "  out no estaba siendo rastreado"

echo "Eliminando coverage del índice..."
git rm -r --cached coverage/ 2>/dev/null || echo "  coverage no estaba siendo rastreado"

echo "Eliminando .env.local del índice..."
git rm --cached .env.local 2>/dev/null || echo "  .env.local no estaba siendo rastreado"

echo "Eliminando .env del índice..."
git rm --cached .env 2>/dev/null || echo "  .env no estaba siendo rastreado"

echo "Eliminando next-env.d.ts del índice..."
git rm --cached next-env.d.ts 2>/dev/null || echo "  next-env.d.ts no estaba siendo rastreado"

echo "Eliminando archivos .log del índice..."
git rm --cached *.log 2>/dev/null || echo "  No hay archivos .log siendo rastreados"

echo "Eliminando archivos de cache del índice..."
git rm --cached .eslintcache 2>/dev/null || echo "  .eslintcache no estaba siendo rastreado"
git rm --cached .stylelintcache 2>/dev/null || echo "  .stylelintcache no estaba siendo rastreado"

echo ""
echo "=========================================="
echo "Archivos eliminados del índice de git"
echo "=========================================="
echo ""
echo "Ahora ejecuta:"
echo "  git add .gitignore"
echo "  git commit -m 'Remove ignored files from git tracking'"
echo ""
echo "Los archivos seguirán existiendo en tu disco local,"
echo "pero git ya no los rastreará."
