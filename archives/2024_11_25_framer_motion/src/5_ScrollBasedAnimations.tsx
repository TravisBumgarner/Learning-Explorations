import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const ScrollBasedAnimations = () => {
	const { scrollYProgress } = useScroll();

	// Take in any motion value and give it a springy effect.
	const scaleY = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

	const background = useTransform(scaleY, [0, 1], ["#ff008c", "#7928ca"]);

	return (
		<div style={{ padding: 16 }}>
			<motion.div
				style={{
					scaleX: scaleY,
					background: background,
					transformOrigin: "left",
					position: "sticky",
					top: 0,
					width: "100%",
					height: 20,
				}}
			></motion.div>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
				tincidunt ex nec nulla commodo blandit. In at ex id dui malesuada
				gravida ut ut dui. Etiam a lorem sit amet nulla vestibulum gravida. Cras
				rhoncus lacus pellentesque odio viverra tincidunt. Etiam mattis interdum
				viverra. Morbi nisi elit, varius et ultrices a, vestibulum nec elit.
				Vestibulum bibendum mollis fringilla. Etiam vulputate vel neque at
				condimentum. Phasellus tortor nibh, molestie quis porttitor eget,
				fermentum at enim. Phasellus eget lorem est. Donec aliquet velit vel
				dictum euismod. Nullam dapibus ligula et tincidunt pulvinar. Vivamus
				vulputate dui eget turpis fringilla, et hendrerit eros fringilla<p></p>.
			</p>
			<p>
				Aenean at feugiat leo. Aenean quis nunc ac nisi dapibus dignissim. Morbi
				mollis suscipit condimentum. Duis congue neque a ullamcorper ornare.
				Maecenas eu consequat enim. Donec ut congue nisi, eu pulvinar urna. Cras
				eu metus libero. Aliquam pharetra cursus hendrerit. Vestibulum eget quam
				varius, luctus sem non, pharetra nibh. Cras mattis nisl eget urna
				sollicitudin posuere. Quisque pretium justo vel eros posuere rhoncus.
				Nunc hendrerit, leo quis commodo molestie, velit eros dignissim mauris,
				nec iaculis urna ex sed augue. Vivamus feugiat nibh sollicitudin viverra
				molestie. Quisque fringilla, augue et condimentum tempus, lorem odio
				tempus odio, ut congue est nisl eget nunc. Duis eleifend lectus nec
				consectetur pellentesque. Pellentesque at feugiat neque.
			</p>
			<p>
				Etiam gravida justo blandit elit pulvinar elementum id vel risus. Donec
				sed massa ultrices, convallis erat mattis, laoreet orci. Integer a
				pellentesque turpis. Nullam tristique, lorem et commodo tempus, nunc
				tortor aliquam nunc, eu varius nibh quam quis enim. Nunc venenatis sed
				risus quis mollis. Etiam sit amet tincidunt augue. Aliquam et quam at
				lorem sollicitudin maximus. Phasellus bibendum egestas sem. Nullam vel
				felis nisi. Ut at tempor lorem, quis condimentum nequ
			</p>
			<p>
				Fusce id aliquam magna, at scelerisque orci. Sed erat neque, vestibulum
				vel molestie quis, rhoncus eu mauris. Fusce ac sollicitudin tellus. In
				ultrices nisl orci, vitae consectetur ante blandit sed. Cras ac mattis
				elit. Curabitur consectetur eleifend elit nec consequat. Etiam facilisis
				ex lacinia risus vehicula, nec mollis leo laoreet. Integer fermentum
				vulputate turpis. Quisque ullamcorper, dolor eget vestibulum eleifend,
				justo urna hendrerit nulla, ac molestie ligula nunc sit amet mauris.
			</p>
			<p>
				In placerat sollicitudin lacus, sit amet ullamcorper lectus condimentum
				nec. Curabitur lobortis viverra velit, id euismod est dictum non.
				Vivamus vitae risus ut dui laoreet hendrerit. Pellentesque fermentum
				ante vel diam molestie, eleifend dapibus nisi sagittis. In pellentesque
				nisi sit amet sapien mattis, vel maximus mauris tempus. Vivamus sagittis
				sit amet urna eu faucibus. Vivamus at interdum eros. Nulla interdum
				vestibulum sodales. Sed dictum accumsan diam, id lobortis velit finibus
				vitae. Nulla augue tellus, maximus non odio non, molestie ultrices leo.
				Ut rhoncus, eros at convallis semper, sapien arcu laoreet est, ac
				rhoncus sapien augue a nulla. Morbi imperdiet est sit amet consectetur
				aliquam. Vestibulum quis urna massa. Proin volutpat velit molestie,
				euismod lorem vitae, hendrerit justo. Nam nec eros sit amet libero
				lacinia auctor id sit amet urna.
			</p>
		</div>
	);
};

export default ScrollBasedAnimations;
