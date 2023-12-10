type StyleFunction<Props> = (props: Props) => any
export type PropsFor<SomeStyleFunction> =
  SomeStyleFunction extends StyleFunction<infer Props> ? Props : never
