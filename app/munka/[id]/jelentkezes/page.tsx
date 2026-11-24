'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Banknote, Check, Clock, FileText, MapPin, Send, ShieldCheck, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/navbar'
import { jobs } from '@/lib/jobs'

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

const selectClass = (hasError?: boolean) =>
  `h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${hasError ? 'border-destructive' : ''}`

type FormErrors = Partial<Record<keyof FormData, string>> & { consent?: string }

export default function ApplicationPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const job = jobs[params.id]
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
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}
    if (!formData.lastName.trim()) newErrors.lastName = 'A vezetéknév megadása kötelező'
    if (!formData.firstName.trim()) newErrors.firstName = 'A keresztnév megadása kötelező'
    if (!formData.birthDate) newErrors.birthDate = 'A születési idő megadása kötelező'
    if (!formData.birthPlace.trim()) newErrors.birthPlace = 'A születési hely megadása kötelező'
    if (!formData.phoneArea || formData.phoneNumber.replace(/\s/g, '').length < 6)
      newErrors.phoneNumber = 'Add meg a körzetszámot és a telefonszámot'
    if (!formData.email.trim()) newErrors.email = 'Az e-mail cím megadása kötelező'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Érvénytelen e-mail cím'
    if (!formData.region) newErrors.region = 'Válassz régiót'
    if (!formData.city.trim()) newErrors.city = 'A település megadása kötelező'
    if (!formData.experience.trim()) newErrors.experience = 'Írj pár szót a szakmai tapasztalatodról'
    if (!formData.desiredPosition.trim()) newErrors.desiredPosition = 'A keresett munkakör megadása kötelező'
    if (!formData.accommodation) newErrors.accommodation = 'Válassz egy lehetőséget'
    if (!consentAccepted) newErrors.consent = 'A jelentkezés elküldéséhez el kell fogadnod a feltételeket'
    return newErrors
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
    `h-12 rounded-md bg-background ${errors[field] ? 'border-destructive focus-visible:ring-destructive/20' : ''}`

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex min-h-screen items-center justify-center px-4 py-28">
          <div className="w-full max-w-xl rounded-lg border border-border bg-card p-8 text-center shadow-xl shadow-zinc-950/5">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-lg bg-primary">
              <Check className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="mb-3 text-3xl font-extrabold text-foreground">Sikeresen jelentkeztél!</h1>
            <p className="mb-8 text-muted-foreground">
              {job ? `A(z) ${job.title} pozícióra beérkezett a jelentkezésed.` : 'Beérkezett a jelentkezésed.'}
              {' '}Toborzó kollégánk 1 munkanapon belül telefonon keres.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/#jobs">
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

      <main className="pt-24 pb-14">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 rounded-md px-1 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Vissza
          </button>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <form noValidate onSubmit={handleSubmit} className="rounded-lg border border-border bg-card shadow-xl shadow-zinc-950/5">
              <div className="border-b border-border p-5 sm:p-6 lg:p-8">
                <p className="mb-2 text-sm font-bold text-primary">{job ? job.title : 'Általános jelentkezés'}</p>
                <h1 className="text-3xl font-extrabold text-foreground lg:text-4xl">Jelentkezés</h1>
                <p className="mt-2 text-muted-foreground">
                  Töltsd ki az alábbi adatokat, és toborzó kollégánk hamarosan felveszi veled a kapcsolatot.
                </p>
              </div>

              <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-6 lg:p-8">
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

                <Field id="phoneNumber" label="Telefonszám" error={errors.phoneNumber} required>
                  <div className="flex gap-2">
                    <select value={formData.phoneCountry} onChange={(e) => updateFormData('phoneCountry', e.target.value)} className="h-12 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 w-[5.5rem] shrink-0" aria-label="Országkód">
                      {countryCodes.map((code) => (
                        <option key={code} value={code}>{code}</option>
                      ))}
                    </select>
                    <select value={formData.phoneArea} onChange={(e) => updateFormData('phoneArea', e.target.value)} className={`h-12 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 w-[6.5rem] shrink-0 ${errors.phoneNumber && !formData.phoneArea ? 'border-destructive' : ''}`} aria-label="Körzetszám">
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

                <Field id="experience" label="Szakmai tapasztalat" error={errors.experience} required>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => updateFormData('experience', e.target.value)}
                    placeholder="Szakmai tapasztalat"
                    rows={5}
                    className={`w-full resize-y rounded-md border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.experience ? 'border-destructive' : 'border-input'}`}
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
                <div className="hidden sm:block" />

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
                <p className="-mt-1 text-sm text-muted-foreground sm:col-span-2">
                  PDF, DOC, DOCX, JPG vagy PNG, fájlonként maximum 5 MB. Pl. bizonyítványok, jogosítványok, képesítések.
                </p>

                <div id="field-consent" className={`rounded-lg border p-4 sm:col-span-2 ${errors.consent ? 'border-destructive bg-destructive/5' : 'border-primary/20 bg-primary/5'}`}>
                  <label className="flex items-start gap-3">
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
                </div>

                <div className="flex flex-col gap-3 border-t border-border pt-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  {Object.values(errors).some(Boolean) ? (
                    <p className="text-sm font-semibold text-destructive">Kérjük, javítsd a pirossal jelölt mezőket.</p>
                  ) : (
                    <p className="text-sm text-muted-foreground"><span className="text-destructive">*</span> kötelező mező</p>
                  )}
                  <Button type="submit" size="lg" disabled={isSubmitting} className="h-12 bg-primary px-8 font-bold text-primary-foreground hover:bg-cta">
                    {isSubmitting ? 'Küldés...' : 'Jelentkezés elküldése'}
                    {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </form>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
              {job && (
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xl shadow-zinc-950/5">
                  <div
                    className="h-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${job.coverImage})` }}
                  />
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
              )}

              <div className="rounded-lg border border-border bg-card p-5">
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
    <div>
      <p className="mb-2 block text-sm font-bold text-foreground">{label}</p>
      <label className="inline-flex h-12 cursor-pointer items-center gap-3 rounded-md bg-primary px-5 font-bold text-primary-foreground shadow-md shadow-primary/20 transition-colors hover:bg-cta focus-within:ring-2 focus-within:ring-primary/40">
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
            <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-2 rounded-md bg-secondary px-3 py-2 text-sm">
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
