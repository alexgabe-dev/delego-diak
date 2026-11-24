'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Briefcase,
  MapPin,
  ShieldCheck,
  Upload,
  X,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/navbar'
import { jobs } from '@/lib/jobs'

const steps = [
  { id: 1, title: 'Személyes adatok', shortTitle: 'Adatok', icon: User },
  { id: 2, title: 'Szakmai adatok', shortTitle: 'Szakma', icon: Briefcase },
  { id: 3, title: 'Dokumentumok', shortTitle: 'Önéletrajz', icon: FileText },
  { id: 4, title: 'Ellenőrzés', shortTitle: 'Küldés', icon: CheckCircle2 },
]

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

type FormErrors = Partial<Record<keyof FormData, string>> & { consent?: string }

export default function ApplicationPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const job = jobs[params.id]
  const [currentStep, setCurrentStep] = useState(1)
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

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    if (step === 1) {
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
    }

    if (step === 2) {
      if (!formData.experience.trim()) newErrors.experience = 'Írj pár szót a szakmai tapasztalatodról'
      if (!formData.desiredPosition.trim()) newErrors.desiredPosition = 'A keresett munkakör megadása kötelező'
      if (!formData.accommodation) newErrors.accommodation = 'Válassz egy lehetőséget'
    }

    if (step === 4 && !consentAccepted) {
      newErrors.consent = 'A jelentkezés elküldéséhez el kell fogadnod a feltételeket'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSuccess(true)
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
            <section className="rounded-lg border border-border bg-card shadow-xl shadow-zinc-950/5">
              <div className="border-b border-border p-5 sm:p-6 lg:p-8">
                <p className="mb-2 text-sm font-bold text-primary">Gyors jelentkezés</p>
                <h1 className="text-3xl font-extrabold text-foreground lg:text-4xl">
                  {steps[currentStep - 1].title}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {currentStep === 1 && 'Add meg az alapadataidat, hogy fel tudjuk venni veled a kapcsolatot.'}
                  {currentStep === 2 && 'Mondd el röviden, milyen tapasztalatod van és milyen munkát keresel.'}
                  {currentStep === 3 && 'Az önéletrajz és a további dokumentumok opcionálisak, de segítenek gyorsabban a megfelelő pozícióhoz illeszteni.'}
                  {currentStep === 4 && 'Nézd át az adatokat, majd küldd el a jelentkezést.'}
                </p>

                <div className="mt-7 grid grid-cols-4 gap-2">
                  {steps.map((step) => (
                    <div key={step.id} className="min-w-0">
                      <div
                        className={`mb-2 flex h-10 items-center justify-center rounded-md border text-sm font-extrabold transition-colors ${
                          step.id < currentStep
                            ? 'border-primary bg-primary text-primary-foreground'
                            : step.id === currentStep
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-secondary text-muted-foreground'
                        }`}
                      >
                        {step.id < currentStep ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                      </div>
                      <p className={`truncate text-center text-xs font-bold ${step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                        <span className="sm:hidden">{step.shortTitle}</span>
                        <span className="hidden sm:inline">{step.title}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6 lg:p-8">
                {currentStep === 1 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Vezetéknév" error={errors.lastName} required>
                      <Input value={formData.lastName} onChange={(e) => updateFormData('lastName', e.target.value)} placeholder="Vezetéknév" className={inputClass('lastName')} />
                    </Field>
                    <Field label="Keresztnév" error={errors.firstName} required>
                      <Input value={formData.firstName} onChange={(e) => updateFormData('firstName', e.target.value)} placeholder="Keresztnév" className={inputClass('firstName')} />
                    </Field>
                    <Field label="Születési idő" error={errors.birthDate} required>
                      <Input type="date" value={formData.birthDate} onChange={(e) => updateFormData('birthDate', e.target.value)} className={inputClass('birthDate')} />
                    </Field>
                    <Field label="Születési hely" error={errors.birthPlace} required>
                      <Input value={formData.birthPlace} onChange={(e) => updateFormData('birthPlace', e.target.value)} placeholder="Születési hely" className={inputClass('birthPlace')} />
                    </Field>
                    <Field label="Telefonszám" error={errors.phoneNumber} required>
                      <div className="flex gap-2">
                        <select value={formData.phoneCountry} onChange={(e) => updateFormData('phoneCountry', e.target.value)} className={`h-12 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 w-[5.5rem] shrink-0`} aria-label="Országkód">
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
                        <Input type="tel" inputMode="numeric" value={formData.phoneNumber} onChange={(e) => updateFormData('phoneNumber', e.target.value.replace(/[^0-9 ]/g, ''))} placeholder="123 4567" className={`${inputClass('phoneNumber')} min-w-0 flex-1`} aria-label="Telefonszám" />
                      </div>
                    </Field>
                    <Field label="E-mail cím" error={errors.email} required>
                      <Input type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} placeholder="E-mail cím" className={inputClass('email')} />
                    </Field>
                    <Field label="Régió" error={errors.region} required>
                      <select value={formData.region} onChange={(e) => updateFormData('region', e.target.value)} className={`h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.region ? 'border-destructive' : ''}`}>
                        <option value="">Válassz</option>
                        {regions.map((region) => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Település" error={errors.city} required>
                      <Input value={formData.city} onChange={(e) => updateFormData('city', e.target.value)} placeholder="Település" className={inputClass('city')} />
                    </Field>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Szakmai tapasztalat" error={errors.experience} required className="sm:row-span-2">
                      <textarea
                        value={formData.experience}
                        onChange={(e) => updateFormData('experience', e.target.value)}
                        placeholder="Szakmai tapasztalat"
                        rows={6}
                        className={`w-full resize-y rounded-md border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.experience ? 'border-destructive' : 'border-input'}`}
                      />
                    </Field>
                    <Field label="Keresett munkakör" error={errors.desiredPosition} required>
                      <Input value={formData.desiredPosition} onChange={(e) => updateFormData('desiredPosition', e.target.value)} placeholder="Keresett munkakör" className={inputClass('desiredPosition')} />
                    </Field>
                    <Field label="Szállásos munkalehetőség" error={errors.accommodation} required>
                      <select value={formData.accommodation} onChange={(e) => updateFormData('accommodation', e.target.value)} className={`h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.accommodation ? 'border-destructive' : ''}`}>
                        <option value="">Válassz</option>
                        {accommodationOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="grid gap-5 sm:grid-cols-2">
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
                    <p className="text-sm text-muted-foreground sm:col-span-2">
                      PDF, DOC, DOCX, JPG vagy PNG, fájlonként maximum 5 MB. Pl. bizonyítványok, jogosítványok, képesítések.
                    </p>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-5">
                    <SummaryBlock title="Személyes adatok" rows={[
                      ['Név', `${formData.lastName} ${formData.firstName}`],
                      ['Születési idő', formData.birthDate],
                      ['Születési hely', formData.birthPlace],
                      ['Telefon', `${formData.phoneCountry} ${formData.phoneArea} ${formData.phoneNumber}`],
                      ['E-mail', formData.email],
                      ['Lakhely', `${formData.city} (${formData.region})`],
                    ]} />
                    <SummaryBlock title="Szakmai adatok" rows={[
                      ['Keresett munkakör', formData.desiredPosition],
                      ['Szállásos munka', formData.accommodation],
                      ['Szakmai tapasztalat', formData.experience],
                    ]} />
                    <SummaryBlock title="Dokumentumok" rows={[
                      ['Önéletrajz', formData.cv?.name || 'Nincs feltöltve'],
                      ['További dokumentumok', formData.documents.length ? `${formData.documents.length} fájl` : 'Nincs'],
                    ]} />

                    <div className={`rounded-lg border p-4 ${errors.consent ? 'border-destructive bg-destructive/5' : 'border-primary/20 bg-primary/5'}`}>
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={consentAccepted}
                          onChange={(e) => {
                            setConsentAccepted(e.target.checked)
                            if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }))
                          }}
                          className="mt-1 h-4 w-4 rounded border-border"
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
                  </div>
                )}

                <div className="mt-8 flex justify-between gap-3 border-t border-border pt-6">
                  {currentStep > 1 ? (
                    <Button variant="outline" size="lg" onClick={handleBack} className="border-2 font-bold">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Vissza
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < steps.length ? (
                    <Button size="lg" onClick={handleNext} className="bg-primary font-bold text-primary-foreground hover:bg-cta">
                      Következő
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="lg" onClick={handleSubmit} disabled={isSubmitting} className="bg-primary font-bold text-primary-foreground hover:bg-cta">
                      {isSubmitting ? 'Küldés...' : 'Jelentkezés elküldése'}
                    </Button>
                  )}
                </div>
              </div>
            </section>

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
  label,
  required,
  error,
  children,
  className = '',
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-bold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-sm font-semibold text-destructive">{error}</p>}
    </div>
  )
}

function SummaryBlock({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="rounded-lg bg-secondary/60 p-4">
      <h3 className="mb-3 font-extrabold text-foreground">{title}</h3>
      <div className="grid gap-2 text-sm sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <p key={label} className="min-w-0">
            <span className="text-muted-foreground">{label}:</span>{' '}
            <span className="break-words font-semibold text-foreground">{value}</span>
          </p>
        ))}
      </div>
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
