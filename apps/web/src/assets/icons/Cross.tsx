const Cross = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 12} height='11' viewBox='0 0 12 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.79605 5.09962L10.9454 1.44797C11.2032 1.2213 11.2032 0.853499 10.9454 0.62682C10.6877 0.399947 10.2702 0.399947 10.0124 0.62682L5.86297 4.27846L1.71335 0.62682C1.45555 0.399947 1.03806 0.399947 0.780262 0.62682C0.522465 0.853499 0.522465 1.2213 0.780262 1.44797L4.92988 5.09962L0.780262 8.75126C0.522465 8.97794 0.522465 9.34574 0.780262 9.57242C0.909161 9.68566 1.07809 9.74238 1.24681 9.74238C1.41552 9.74238 1.58445 9.68566 1.71335 9.57222L5.86297 5.92058L10.0124 9.57222C10.1413 9.68566 10.3102 9.74238 10.4789 9.74238C10.6476 9.74238 10.8166 9.68566 10.9454 9.57222C11.2032 9.34554 11.2032 8.97775 10.9454 8.75107L6.79605 5.09962Z'
        fill='#00D2FF'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.492936 0.374144C0.909233 0.0079014 1.5836 0.00793519 1.99985 0.374245C1.99985 0.374247 1.99985 0.374243 1.99985 0.374245L5.86249 3.77335L9.72492 0.374252C10.1412 0.00793502 10.8155 0.00789913 11.2318 0.374144C11.6483 0.74032 11.6483 1.3344 11.2318 1.70058L7.36953 5.09958L11.2318 8.49839C11.2319 8.49843 11.2318 8.49836 11.2318 8.49839C11.6481 8.86454 11.6482 9.45857 11.232 9.82472M11.232 9.82472C11.024 10.0077 10.7504 10.0995 10.4784 10.0995C10.2064 10.0995 9.93292 10.0078 9.72492 9.82472L5.86249 6.42563L1.99986 9.82472C1.99986 9.82473 1.99986 9.82472 1.99986 9.82472C1.79185 10.0078 1.51837 10.0995 1.24634 10.0995C0.974342 10.0995 0.700995 10.0078 0.493059 9.82513C0.0766527 9.45899 0.0764916 8.86487 0.492821 8.49869C0.492859 8.49865 0.492783 8.49872 0.492821 8.49869L4.35546 5.09958L0.492936 1.70058C0.492898 1.70055 0.492974 1.70061 0.492936 1.70058C0.0766476 1.33443 0.0766526 0.740295 0.492936 0.374144M1.4259 0.879318C1.32659 0.791925 1.16608 0.791925 1.06677 0.879318C0.967621 0.9665 0.967499 1.10812 1.06665 1.1953L5.50336 5.09958L1.06676 9.00377C0.967613 9.09095 0.967499 9.23256 1.06665 9.31974C1.11649 9.36347 1.18096 9.3852 1.24634 9.3852C1.31173 9.3852 1.37611 9.36347 1.4259 9.31966L5.8625 5.41547L10.2989 9.31966C10.3487 9.36347 10.413 9.3852 10.4784 9.3852C10.5438 9.3852 10.6082 9.36347 10.658 9.31966C10.7572 9.23247 10.7573 9.09086 10.6581 9.00367L6.22164 5.09959L10.658 1.19541C10.7572 1.10822 10.7573 0.966608 10.6581 0.879425C10.5588 0.792033 10.3982 0.791925 10.2989 0.879318L5.8625 4.78351L1.4259 0.879318Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Cross