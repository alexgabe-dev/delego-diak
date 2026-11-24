'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  Check,
  Clock,
  Database,
  FileText,
  Home,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Upload,
  User,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/navbar'
import type { JobDetail } from '@/lib/jobs'

interface FormData {
  lastName: string
  firstName: string
  birthDate: string
  birthPlace: string
  phoneCountry: string
  phoneArea: string
  phoneNumber: string
  email: string
  region: string
  city: string
  experience: string
  desiredPosition: string
  accommodation: string
  cv: File | null
  documents: File[]
}

type FormErrors = Partial<Record<keyof FormData, string>> & { consent?: string }

const countryCodes = ['+36', '+40', '+421', '+381', '+380', '+43']
const areaCodes = ['20', '30', '31', '50', '70', '1']
const regions = [
  'Budapest',
  'Pest',
  'Közép-Dunántúl',
  'Nyugat-Dunántúl',
  'Dél-Dunántúl',
  'Észak-Magyarország',
  'Észak-Alföld',
  'Dél-Alföld',
]
const accommodationOptions = ['Igen, szállásos munkát keresek', 'Nem, nincs szükségem szállásra', 'Mindkettő érdekel']

const controlBase =
  'h-12 rounded-lg border bg-background text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

export function ApplicationPage({ job }: { job?: JobDetail }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    birthDate: '',
    birthPlace: '',
    phoneCountry: '+36',
    phoneArea: '',
    phoneNumber: '',
    email: '',
    region: '',
    city: '',
    experience: '',
    desiredPosition: job?.title.split(' – ')[0] ?? '',
    accommodation: '',
    cv: null,
    documents: [],
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const updateFormData = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!formData.lastName.trim()) e.lastName = 'A vezetéknév megadása kötelező'
    if (!formData.firstName.trim()) e.firstName = 'A keresztnév megadása kötelező'
    if (!formData.birthDate) e.birthDate = 'A születési idő megadása kötelező'
    if (!formData.birthPlace.trim()) e.birthPlace = 'A születési hely megadása kötelező'
    if (!formData.phoneArea || formData.phoneNumber.replace(/\s/g, '').length < 6)
      e.phoneNumber = 'Add meg a körzetszámot és a telefonszámot'
    if (!formData.email.trim()) e.email = 'Az e-mail cím megadása kötelező'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Érvénytelen e-mail cím'
    if (!formData.region) e.region = 'Válassz régiót'
    if (!formData.city.trim()) e.city = 'A település megadása kötelező'
    if (!formData.experience.trim()) e.experience = 'Írj pár szót a szakmai tapasztalatodról'
    if (!formData.desiredPosition.trim()) e.desiredPosition = 'A keresett munkakör megadása kötelező'
    if (!formData.accommodation) e.accommodation = 'Válassz egy lehetőséget'
    if (!consentAccepted) e.consent = 'A jelentkezés elküldéséhez el kell fogadnod a feltételeket'
    return e
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    const firstError = Object.keys(newErrors)[0]
    if (firstError) {
      document.getElementById(`field-${firstError}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSuccess(true)
    window.scrollTo({ top: 0 })
  }

  const inputClass = (field: keyof FormData) =>
    `h-12 rounded-lg bg-background ${errors[field] ? 'border-destructive focus-visible:ring-destructive/20' : ''}`
  const selectClass = (hasError?: boolean, extra = 'w-full px-3') =>
    `${controlBase} ${extra} ${hasError ? 'border-destructive' : 'border-input'}`

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex min-h-screen items-center justify-center px-4 py-28">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-xl shadow-zinc-950/5">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary">
              <Check className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="mb-3 text-3xl font-extrabold text-foreground">Köszönjük a jelentkezést!</h1>
            <p className="mb-2 text-muted-foreground">
              {job
                ? `A(z) ${job.title} pozícióra beérkezett a jelentkezésed.`
                : 'Bekerültél az adatbázisunkba.'}
            </p>
            <p className="mb-8 text-lg font-semibold text-foreground">
              Kollégáink <span className="text-primary">a lehető legrövidebb</span> időn belül felkeresik!
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/munkak">
                <Button size="lg" className="w-full bg-primary font-bold text-primary-foreground hover:bg-cta sm:w-auto">
                  További állások
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="w-full border-2 font-bold sm:w-auto">
                  Főoldal
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-10 sm:pt-24 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 rounded-md px-1 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Vissza
          </button>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <form noValidate onSubmit={handleSubmit} className="space-y-4">
              {/* Fejléc csempe */}
              <div className="relative overflow-hidden rounded-2xl bg-zinc-900 p-5 text-white shadow-xl shadow-zinc-950/10 sm:p-8 dark:bg-card dark:ring-1 dark:ring-border">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
                <p className="relative mb-2 text-sm font-bold uppercase tracking-[0.14em] text-primary">
                  {job ? job.title : 'Adatbázisba jelentkezés'}
                </p>
                <h1 className="relative text-[1.75rem] font-extrabold sm:text-3xl lg:text-4xl">Jelentkezés</h1>
                <p className="relative mt-2 max-w-2xl text-sm text-white/70 sm:text-base">
                  {job
                    ? 'Töltsd ki az alábbi adatokat, és kollégáink a lehető legrövidebb időn belül felkeresnek.'
                    : 'Regisztrálj az adatbázisunkba, és amint hozzád illő állás nyílik, felkeresünk.'}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Személyes adatok */}
                <Tile icon={User} title="Személyes adatok" className="md:col-span-2">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="lastName" label="Vezetéknév" error={errors.lastName} required>
                      <Input value={formData.lastName} onChange={(e) => updateFormData('lastName', e.target.value)} placeholder="Vezetéknév" autoComplete="family-name" className={inputClass('lastName')} />
                    </Field>
                    <Field id="firstName" label="Keresztnév" error={errors.firstName} required>
                      <Input value={formData.firstName} onChange={(e) => updateFormData('firstName', e.target.value)} placeholder="Keresztnév" autoComplete="given-name" className={inputClass('firstName')} />
                    </Field>
                    <Field id="birthDate" label="Születési idő" error={errors.birthDate} required>
                      <Input type="date" value={formData.birthDate} onChange={(e) => updateFormData('birthDate', e.target.value)} autoComplete="bday" className={inputClass('birthDate')} />
                    </Field>
                    <Field id="birthPlace" label="Születési hely" error={errors.birthPlace} required>
                      <Input value={formData.birthPlace} onChange={(e) => updateFormData('birthPlace', e.target.value)} placeholder="Születési hely" className={inputClass('birthPlace')} />
                    </Field>
                  </div>
                </Tile>

                {/* Elérhetőség */}
                <Tile icon={Phone} title="Elérhetőség">
                  <div className="space-y-4">
                    <Field id="phoneNumber" label="Telefonszám" error={errors.phoneNumber} required>
                      <div className="flex gap-1.5 sm:gap-2">
                        <select value={formData.phoneCountry} onChange={(e) => updateFormData('phoneCountry', e.target.value)} className={selectClass(false, 'w-[4.5rem] shrink-0 px-1.5 sm:w-[5.25rem] sm:px-2')} aria-label="Országkód">
                          {countryCodes.map((code) => (
                            <option key={code} value={code}>{code}</option>
                          ))}
                        </select>
                        <select value={formData.phoneArea} onChange={(e) => updateFormData('phoneArea', e.target.value)} className={selectClass(!!errors.phoneNumber && !formData.phoneArea, 'w-[5.5rem] shrink-0 px-1.5 sm:w-[6.25rem] sm:px-2')} aria-label="Körzetszám">
                          <option value="">Körzet</option>
                          {areaCodes.map((code) => (
                            <option key={code} value={code}>{code}</option>
                          ))}
                        </select>
                        <Input type="tel" inputMode="numeric" autoComplete="tel-national" value={formData.phoneNumber} onChange={(e) => updateFormData('phoneNumber', e.target.value.replace(/[^0-9 ]/g, ''))} placeholder="123 4567" className={`${inputClass('phoneNumber')} min-w-0 flex-1`} aria-label="Telefonszám" />
                      </div>
                    </Field>
                    <Field id="email" label="E-mail cím" error={errors.email} required>
                      <Input type="email" autoComplete="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} placeholder="E-mail cím" className={inputClass('email')} />
                    </Field>
                  </div>
                </Tile>

                {/* Lakhely */}
                <Tile icon={Home} title="Lakhely">
                  <div className="space-y-4">
                    <Field id="region" label="Régió" error={errors.region} required>
                      <select value={formData.region} onChange={(e) => updateFormData('region', e.target.value)} className={selectClass(!!errors.region)}>
                        <option value="">Válassz</option>
                        {regions.map((region) => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </Field>
                    <Field id="city" label="Település" error={errors.city} required>
                      <Input value={formData.city} onChange={(e) => updateFormData('city', e.target.value)} placeholder="Település" autoComplete="address-level2" className={inputClass('city')} />
                    </Field>
                  </div>
                </Tile>

                {/* Szakmai adatok */}
                <Tile icon={Briefcase} title="Szakmai adatok" className="md:col-span-2">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="experience" label="Szakmai tapasztalat" error={errors.experience} required className="sm:row-span-2">
                      <textarea
                        value={formData.experience}
                        onChange={(e) => updateFormData('experience', e.target.value)}
                        placeholder="Szakmai tapasztalat"
                        rows={6}
                        className={`h-[calc(100%-1.75rem)] min-h-36 w-full resize-y rounded-lg border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.experience ? 'border-destructive' : 'border-input'}`}
                      />
                    </Field>
                    <Field id="desiredPosition" label="Keresett munkakör" error={errors.desiredPosition} required>
                      <Input value={formData.desiredPosition} onChange={(e) => updateFormData('desiredPosition', e.target.value)} placeholder="Keresett munkakör" className={inputClass('desiredPosition')} />
                    </Field>
                    <Field id="accommodation" label="Szállásos munkalehetőség" error={errors.accommodation} required>
                      <select value={formData.accommodation} onChange={(e) => updateFormData('accommodation', e.target.value)} className={selectClass(!!errors.accommodation)}>
                        <option value="">Válassz</option>
                        {accommodationOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </Tile>

                {/* Dokumentumok */}
                <Tile icon={FileText} title="Dokumentumok" className="md:col-span-2">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <UploadBox
                      label="Önéletrajz feltöltése"
                      buttonLabel="Önéletrajz feltöltése"
                      files={formData.cv ? [formData.cv] : []}
                      onFiles={(files) => updateFormData('cv', files[0] ?? null)}
                    />
                    <UploadBox
                      label="További dokumentumok feltöltése"
                      buttonLabel="Feltöltés"
                      multiple
                      files={formData.documents}
                      onFiles={(files) => updateFormData('documents', files)}
                    />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    PDF, DOC, DOCX, JPG vagy PNG, fájlonként maximum 5 MB. Pl. bizonyítványok, jogosítványok, képesítések.
                  </p>
                </Tile>

                {/* Elfogadás és küldés */}
                <div id="field-consent" className="scroll-mt-28 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 md:col-span-2">
                  <label className={`flex items-start gap-3 rounded-xl p-4 ${errors.consent ? 'bg-destructive/5 ring-1 ring-destructive' : 'bg-secondary'}`}>
                    <input
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(e) => {
                        setConsentAccepted(e.target.checked)
                        if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }))
                      }}
                      className="mt-1 h-4 w-4 rounded border-border accent-primary"
                    />
                    <span className="text-sm text-muted-foreground">
                      Elolvastam és elfogadom az{' '}
                      <Link href="/adatvedelem" className="font-bold text-primary hover:underline">adatvédelmi tájékoztatót</Link>
                      {' '}és az{' '}
                      <Link href="/aszf" className="font-bold text-primary hover:underline">általános szerződési feltételeket</Link>.
                    </span>
                  </label>
                  {errors.consent && <p className="mt-2 text-sm font-semibold text-destructive">{errors.consent}</p>}

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {Object.values(errors).some(Boolean) ? (
                      <p className="text-sm font-semibold text-destructive">Kérjük, javítsd a pirossal jelölt mezőket.</p>
                    ) : (
                      <p className="text-sm text-muted-foreground"><span className="text-destructive">*</span> kötelező mező</p>
                    )}
                    <Button type="submit" size="lg" disabled={isSubmitting} className="h-12 w-full rounded-lg sm:w-auto bg-primary px-8 font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-cta">
                      {isSubmitting ? 'Küldés...' : 'Jelentkezés elküldése'}
                      {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            <aside className="hidden space-y-4 lg:sticky lg:top-24 lg:block lg:h-fit">
              {job ? (
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-zinc-950/5">
                  <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${job.coverImage})` }} />
                  <div className="p-5">
                    <p className="mb-1 text-sm font-bold text-primary">Jelentkezés erre</p>
                    <h2 className="text-xl font-extrabold text-foreground">{job.title}</h2>
                    <div className="mt-5 space-y-3 text-sm">
                      <Info icon={Banknote} label="Havi bér" value={job.salary} />
                      <Info icon={MapPin} label="Helyszín" value={job.location} />
                      <Info icon={Clock} label="Beosztás" value={job.schedule} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-zinc-950/5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                    <Database className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-extrabold text-foreground">Miért jó az adatbázis?</h2>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {[
                      'Elsőként értesülsz a hozzád illő állásokról',
                      'Nem kell minden állásra külön jelentkezned',
                      'Országos lefedettség, szállásos munkák is',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2 font-extrabold text-foreground">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Biztonságos jelentkezés
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  Az adataidat csak a jelentkezés feldolgozásához használjuk, és a partner felé csak a szükséges információkat továbbítjuk.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

function Tile({
  icon: Icon,
  title,
  className = '',
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6 ${className}`}>
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-lg font-extrabold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Field({
  id,
  label,
  required,
  error,
  children,
  className = '',
}: {
  id?: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div id={id ? `field-${id}` : undefined} className={`scroll-mt-28 ${className}`}>
      <label className="mb-2 block text-sm font-bold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-sm font-semibold text-destructive">{error}</p>}
    </div>
  )
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </span>
      <span className="text-right font-bold text-foreground">{value}</span>
    </div>
  )
}

function UploadBox({
  label,
  buttonLabel,
  files,
  onFiles,
  multiple = false,
}: {
  label: string
  buttonLabel: string
  files: File[]
  onFiles: (files: File[]) => void
  multiple?: boolean
}) {
  return (
    <div className="rounded-xl border-2 border-dashed border-border bg-secondary/50 p-4">
      <p className="mb-3 text-sm font-bold text-foreground">{label}</p>
      <label className="inline-flex h-12 cursor-pointer items-center gap-3 rounded-lg bg-primary px-5 font-bold text-primary-foreground shadow-md shadow-primary/20 transition-colors hover:bg-cta focus-within:ring-2 focus-within:ring-primary/40">
        {buttonLabel}
        <Upload className="h-5 w-5" />
        <input
          type="file"
          multiple={multiple}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(e) => {
            const picked = Array.from(e.target.files ?? [])
            onFiles(multiple ? [...files, ...picked] : picked)
            e.target.value = ''
          }}
          className="sr-only"
        />
      </label>
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-2 rounded-lg bg-card px-3 py-2 text-sm">
              <span className="flex min-w-0 items-center gap-2 font-semibold text-foreground">
                <FileText className="h-4 w-4 shrink-0 text-primary" />
                <span className="truncate">{file.name}</span>
              </span>
              <button
                type="button"
                onClick={() => onFiles(files.filter((_, i) => i !== index))}
                className="text-muted-foreground hover:text-primary"
                aria-label={`${file.name} eltávolítása`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
