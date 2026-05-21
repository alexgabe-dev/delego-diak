'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Briefcase, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const cities = ['Budapest', 'Debrecen', 'Szeged', 'Pécs', 'Győr', 'Miskolc']
const categories = ['Vendéglátás', 'Irodai', 'Promóció', 'Fizikai', 'IT', 'Egyéb']
const workTypes = ['Részmunkaidő', 'Teljes munkaidő', 'Alkalmi']

export function SearchSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedWorkType, setSelectedWorkType] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const hasActiveFilters = selectedCity || selectedCategory || selectedWorkType

  const clearFilters = () => {
    setSelectedCity('')
    setSelectedCategory('')
    setSelectedWorkType('')
  }

  const submitSearch = () => {
    const params = new URLSearchParams()

    if (searchQuery.trim()) params.set('q', searchQuery.trim())
    if (selectedCity) params.set('city', selectedCity)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedWorkType) params.set('type', selectedWorkType)

    const queryString = params.toString()
    router.push(queryString ? `/munkak?${queryString}` : '/munkak')
  }

  return (
    <section className="relative z-10 mx-auto -mt-16 max-w-5xl px-4 lg:px-8">
      <div className="rounded-lg border border-border/70 bg-card/95 p-4 shadow-2xl shadow-slate-950/10 backdrop-blur-md lg:p-5">
        {/* Main search bar */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Milyen munkát keresel?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitSearch()
              }}
              className="h-12 rounded-md border-2 border-transparent bg-secondary pl-12 text-base transition-colors focus:border-primary focus:bg-card"
            />
          </div>
          
          {/* Desktop filters */}
          <div className="hidden gap-3 lg:flex">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="h-12 rounded-md border-2 border-transparent bg-secondary px-4 text-sm font-medium text-foreground transition-colors focus:border-primary focus:bg-card focus:outline-none"
            >
              <option value="">Minden város</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 rounded-md border-2 border-transparent bg-secondary px-4 text-sm font-medium text-foreground transition-colors focus:border-primary focus:bg-card focus:outline-none"
            >
              <option value="">Minden kategória</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <Button 
            size="lg" 
            onClick={submitSearch}
            className="h-12 bg-primary px-8 font-semibold text-primary-foreground hover:bg-cta"
          >
            <Search className="mr-2 h-5 w-5" />
            Keresés
          </Button>
        </div>
        
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mt-3 flex w-full items-center justify-center gap-2 text-sm font-medium text-primary lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {showFilters ? 'Szűrők elrejtése' : 'Szűrők megjelenítése'}
        </button>
        
        {/* Mobile filters panel */}
        {showFilters && (
          <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2 lg:hidden">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Város
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-11 w-full rounded-md border-2 border-border bg-card px-4 text-sm font-medium text-foreground focus:border-primary focus:outline-none"
              >
                <option value="">Minden város</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                Kategória
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-11 w-full rounded-md border-2 border-border bg-card px-4 text-sm font-medium text-foreground focus:border-primary focus:outline-none"
              >
                <option value="">Minden kategória</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-muted-foreground">
                Munka típusa
              </label>
              <div className="flex flex-wrap gap-2">
                {workTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedWorkType(selectedWorkType === type ? '' : type)}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                      selectedWorkType === type
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-primary/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Active filters */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">Aktív szűrők:</span>
            {selectedCity && (
              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {selectedCity}
                <button onClick={() => setSelectedCity('')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedWorkType && (
              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {selectedWorkType}
                <button onClick={() => setSelectedWorkType('')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Összes törlése
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
