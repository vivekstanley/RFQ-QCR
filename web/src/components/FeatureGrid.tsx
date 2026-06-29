const features = [
  {
    step: '01',
    title: 'Connect & configure',
    description:
      'Link your preferred LLM account and add RFQ templates to standardize how requests are drafted.',
  },
  {
    step: '02',
    title: 'Upload & draft',
    description:
      'Submit policy documents, asset details, and customer requirements. AI analyzes inputs and drafts your RFQ.',
  },
  {
    step: '03',
    title: 'Review & finalize',
    description:
      'Edit the draft RFQ with full control, then finalize it when you are ready to send to insurers.',
  },
  {
    step: '04',
    title: 'Distribute to insurers',
    description:
      'Optionally email the finalized RFQ to multiple insurers directly from the platform.',
  },
  {
    step: '05',
    title: 'Compare quotes',
    description:
      'Parse insurer responses automatically, update quote comparisons, and share results as PDF.',
  },
]

export function FeatureGrid() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-caption font-medium uppercase tracking-wider text-primary-600">
            MVP workflow
          </p>
          <h2 className="mt-2 text-h2 font-medium text-neutral-700">
            Everything you need for the RFQ lifecycle
          </h2>
          <p className="mt-3 text-subtitle text-neutral-500">
            From first input to final quote comparison — five integrated steps designed for
            insurance teams.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.step}
              className="rounded-md border border-neutral-200 bg-neutral-50 p-6 transition-shadow hover:shadow-card"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary-100 text-caption font-medium text-primary-700">
                {feature.step}
              </span>
              <h3 className="mt-4 text-title font-medium text-neutral-700">{feature.title}</h3>
              <p className="mt-2 text-body text-neutral-500">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
