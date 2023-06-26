#!/usr/bin/env bash

source .env
npx supabase gen types typescript --db-url="${DATABASE_URL}" --schema public > "lib/database.types.ts"
