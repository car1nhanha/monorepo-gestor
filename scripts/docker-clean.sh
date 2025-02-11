#!/bin/bash
echo "Limpando containers, imagens, redes e volumes não utilizados..."
docker system prune -af --volumes
echo "Docker limpo com sucesso!"
