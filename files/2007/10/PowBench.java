
public class PowBench {
	/**
	 * Approximates Math.pow(a, b). Untested for negative numbers, approximation
	 * might not be very precise.
	 * 
	 * @param a
	 *            The base.
	 * @param b
	 *            The exponent.
	 * @return The approximation of a^b.
	 */
	public static double pow(final double a, final double b) {
		final long tmp = Double.doubleToLongBits(a);
		final long tmp2 = (long) (b * (tmp - 4606921280493453312L)) + 4606921280493453312L;
		return Double.longBitsToDouble(tmp2);
	}

	/**
	 * Just a dummy method for comparison with function call / overoptimization
	 * prevention overhead.
	 * 
	 * @param a
	 *            Base.
	 * @param b
	 *            Exponent
	 * @return A is returned (TODO be might get optimized away).
	 */
	public static double dummy(final double a, final double b) {
		return a;
	}

	/**
	 * Continuously performs the benchmark. The first run should be discarded,
	 * it is just a warming up phase. Increase/decrease total so that the run
	 * takes long enough for reasonable numbers.
	 * 
	 * @param args
	 *            Not used.
	 */
	public static void main(final String[] args) {
		System.out.println((double) 4606921280493453312L);
		final int total = 100000000;
		double a = 1.2;
		double b = 2.3;
		double sum = 0.0;
		long before;
		long after;
		long i;

		while (true) {
			System.out.println();
			before = System.currentTimeMillis();
			i = total;
			sum = 0.0;
			a = 1.2;
			b = 2.3;
			while (--i > 0) {
				sum += dummy(a + 0.1, b);
				sum += dummy(a + 0.01, b);
				sum += dummy(a + 0.02, b);
				sum += dummy(a, b + 0.01);
				sum += dummy(a, b + 0.02);
				sum += dummy(a, b + 0.1);
				a += 1e-10;
				b -= 1e-10;
			}
			after = System.currentTimeMillis();
			double t_dummy = ((after - before) / 1000.0);
			System.out.println("" + t_dummy + " sec, sum=" + sum + " dummy");

			before = System.currentTimeMillis();
			i = total;
			sum = 0.0;
			a = 1.2;
			b = 2.3;
			while (--i > 0) {
				sum += pow(a + 0.1, b);
				sum += pow(a + 0.01, b);
				sum += pow(a + 0.02, b);
				sum += pow(a, b + 0.01);
				sum += pow(a, b + 0.02);
				sum += pow(a, b + 0.1);
				a += 1e-10;
				b -= 1e-10;
			}
			after = System.currentTimeMillis();
			double t_approx = ((after - before) / 1000.0);
			System.out.println("" + t_approx + " sec, sum=" + sum + " approx");

			before = System.currentTimeMillis();

			// only run 1/100th time as often because life is short
			i = total / 100;
			sum = 0.0;
			a = 1.2;
			b = 2.3;
			while (--i > 0) {
				sum += Math.pow(a + 0.1, b);
				sum += Math.pow(a + 0.01, b);
				sum += Math.pow(a + 0.02, b);
				sum += Math.pow(a, b + 0.01);
				sum += Math.pow(a, b + 0.02);
				sum += Math.pow(a, b + 0.1);
				a += 1e-10;
				b -= 1e-10;
			}
			after = System.currentTimeMillis();
			double t_original = ((after - before) / 10.0);
			System.out
					.println("" + t_original + " sec, sum=" + sum + " origin");

			double speedup = (t_original - t_dummy) / (t_approx - t_dummy);
			System.out.println("Speedup: " + speedup);

		}
	}
}
