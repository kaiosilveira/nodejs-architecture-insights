export default class Resource {
  static for({ router, tag, supports }) {
    Object.entries(supports).forEach(([key, stages]) => {
      router.route(`/${tag}s`)[key](...stages);
    });

    return { router };
  }
}
