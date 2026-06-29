import { Link } from 'react-router-dom'
import { Button } from '@ahmed.tawfik.galal/design-system'
import { Header } from '../components/Header'
import { FeatureGrid } from '../components/FeatureGrid'
import { Footer } from '../components/Footer'

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#DFF7F7_0%,_transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#EEFCFC_0%,_transparent_45%)]" />

          <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-md border border-primary-200 bg-primary-50 px-3 py-1 text-caption font-medium text-primary-700">
                Insurance RFQ management platform
              </span>

              <h1 className="mt-6 text-h1 font-medium text-neutral-700 lg:text-[42px] lg:leading-[50px]">
                Draft, distribute, and compare insurance RFQs — all in one place
              </h1>

              <p className="mt-5 max-w-2xl text-subtitle text-neutral-500">
                RFQ-QCR helps you turn customer inputs into structured requests for quote,
                send them to insurers, and analyze returned quotes with AI-powered workflows.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/signup">
                  <Button variant="primary" size="large">
                    Get started free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="large">
                    Log in
                  </Button>
                </Link>
              </div>

              <dl className="mt-12 grid gap-6 border-t border-neutral-200 pt-8 sm:grid-cols-3">
                <div>
                  <dt className="text-caption text-neutral-500">Input formats</dt>
                  <dd className="mt-1 text-title font-medium text-neutral-700">
                    Excel, PDF, text, email
                  </dd>
                </div>
                <div>
                  <dt className="text-caption text-neutral-500">AI-assisted</dt>
                  <dd className="mt-1 text-title font-medium text-neutral-700">
                    Draft RFQs from your data
                  </dd>
                </div>
                <div>
                  <dt className="text-caption text-neutral-500">Quote comparison</dt>
                  <dd className="mt-1 text-title font-medium text-neutral-700">
                    Preview, PDF, and share
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <FeatureGrid />

        <section className="bg-primary-600 py-16">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-h2 font-medium text-white">
                Ready to streamline your RFQ process?
              </h2>
              <p className="mt-3 text-subtitle text-primary-100">
                Create an account to connect your LLM, upload inputs, and start drafting RFQs
                in minutes.
              </p>
            </div>
            <Link to="/signup">
              <Button
                variant="outline"
                size="large"
                className="border-white text-white hover:border-white hover:bg-white/10"
              >
                Create your account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
