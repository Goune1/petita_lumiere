const navigation = {
  company: [
    { name: 'Vinted', href: 'https://www.vinted.fr/member/30731362-sld33610' },
    { name: 'Leboncoin', href: 'https://www.leboncoin.fr/profile/f54837c8-3560-4e29-89e8-06e0619880c5/offers' },
    { name: 'Instagram', href: 'https://www.instagram.com/petita_lumieres?igsh=MWh0czVkamVscnlxNQ' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/legals/mentions-legales' },
    { name: 'Conditions générales d\'utilisation', href: '/legals/conditions-generales-utilisation' },
    { name: 'Conditions générales de vente', href: '/legals/conditions-generales-de-vente' },
  ],
}

export default function Example() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <img
            className="h-7"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Petita Lumière"
          />
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Nos plateformes & réseaux</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
