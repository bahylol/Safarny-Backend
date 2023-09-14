module.exports = function (dynamicText) {
	return `
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
		<meta charset="UTF-8" />
		<meta content="width=device-width, initial-scale=1" name="viewport" />
		<meta name="x-apple-disable-message-reformatting" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta content="telephone=no" name="format-detection" />
		<title>New message</title>
		<!--[if (mso 16)]>
			<style type="text/css">
				a {
					text-decoration: none;
				}
			</style>
		<![endif]-->
		<!--[if gte mso 9
			]><style>
				sup {
					font-size: 100% !important;
				}
			</style><!
		[endif]-->
		<!--[if gte mso 9]>
			<xml>
				<o:OfficeDocumentSettings>
					<o:AllowPNG></o:AllowPNG>
					<o:PixelsPerInch>96</o:PixelsPerInch>
				</o:OfficeDocumentSettings>
			</xml>
		<![endif]-->
		<!--[if !mso]><!-- -->
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css?family=Arvo:400,400i,700,700i"
		/>
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,400i,700,700i"
		/>
		<!--<![endif]-->
		<style type="text/css">
			.rollover:hover .rollover-first {
				max-height: 0px !important;
				display: none !important;
			}
			.rollover:hover .rollover-second {
				max-height: none !important;
				display: inline-block !important;
			}
			.rollover div {
				font-size: 0px;
			}
			u ~ div img + div > div {
				display: none;
			}
			#outlook a {
				padding: 0;
			}
			span.MsoHyperlink,
			span.MsoHyperlinkFollowed {
				color: inherit;
				mso-style-priority: 99;
			}
			a.es-button {
				mso-style-priority: 100 !important;
				text-decoration: none !important;
			}
			a[x-apple-data-detectors] {
				color: inherit !important;
				text-decoration: none !important;
				font-size: inherit !important;
				font-family: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}
			.es-desk-hidden {
				display: none;
				float: left;
				overflow: hidden;
				width: 0;
				max-height: 0;
				line-height: 0;
				mso-hide: all;
			}
			.es-header-body a:hover {
				color: #999999 !important;
			}
			.es-content-body a:hover {
				color: #999999 !important;
			}
			.es-footer-body a:hover {
				color: #cccccc !important;
			}
			.es-infoblock a:hover {
				color: #cccccc !important;
			}
			.es-button-border:hover > a.es-button {
				color: #ffffff !important;
			}
			@media only screen and (max-width: 600px) {
				.es-m-p0r {
					padding-right: 0px !important;
				}
				.es-m-p25b {
					padding-bottom: 25px !important;
				}
				.es-m-p0r {
					padding-right: 0px !important;
				}
				.es-m-p0r {
					padding-right: 0px !important;
				}
				.es-m-p20b {
					padding-bottom: 20px !important;
				}
				.es-m-p20b {
					padding-bottom: 20px !important;
				}
				.es-m-p20b {
					padding-bottom: 20px !important;
				}
				*[class='gmail-fix'] {
					display: none !important;
				}
				p,
				a {
					line-height: 150% !important;
				}
				h1,
				h1 a {
					line-height: 120% !important;
				}
				h2,
				h2 a {
					line-height: 120% !important;
				}
				h3,
				h3 a {
					line-height: 120% !important;
				}
				h4,
				h4 a {
					line-height: 120% !important;
				}
				h5,
				h5 a {
					line-height: 120% !important;
				}
				h6,
				h6 a {
					line-height: 120% !important;
				}
				h1 {
					font-size: 30px !important;
					text-align: center;
				}
				h2 {
					font-size: 26px !important;
					text-align: center;
				}
				h3 {
					font-size: 20px !important;
					text-align: center;
				}
				h4 {
					font-size: 24px !important;
					text-align: left;
				}
				h5 {
					font-size: 20px !important;
					text-align: left;
				}
				h6 {
					font-size: 16px !important;
					text-align: left;
				}
				.es-header-body h1 a,
				.es-content-body h1 a,
				.es-footer-body h1 a {
					font-size: 30px !important;
				}
				.es-header-body h2 a,
				.es-content-body h2 a,
				.es-footer-body h2 a {
					font-size: 26px !important;
				}
				.es-header-body h3 a,
				.es-content-body h3 a,
				.es-footer-body h3 a {
					font-size: 20px !important;
				}
				.es-header-body h4 a,
				.es-content-body h4 a,
				.es-footer-body h4 a {
					font-size: 24px !important;
				}
				.es-header-body h5 a,
				.es-content-body h5 a,
				.es-footer-body h5 a {
					font-size: 20px !important;
				}
				.es-header-body h6 a,
				.es-content-body h6 a,
				.es-footer-body h6 a {
					font-size: 16px !important;
				}
				.es-menu td a {
					font-size: 12px !important;
				}
				.es-header-body p,
				.es-header-body a {
					font-size: 16px !important;
				}
				.es-content-body p,
				.es-content-body a {
					font-size: 16px !important;
				}
				.es-footer-body p,
				.es-footer-body a {
					font-size: 16px !important;
				}
				.es-infoblock p,
				.es-infoblock a {
					font-size: 12px !important;
				}
				.es-m-txt-c,
				.es-m-txt-c h1,
				.es-m-txt-c h2,
				.es-m-txt-c h3,
				.es-m-txt-c h4,
				.es-m-txt-c h5,
				.es-m-txt-c h6 {
					text-align: center !important;
				}
				.es-m-txt-r,
				.es-m-txt-r h1,
				.es-m-txt-r h2,
				.es-m-txt-r h3,
				.es-m-txt-r h4,
				.es-m-txt-r h5,
				.es-m-txt-r h6 {
					text-align: right !important;
				}
				.es-m-txt-j,
				.es-m-txt-j h1,
				.es-m-txt-j h2,
				.es-m-txt-j h3,
				.es-m-txt-j h4,
				.es-m-txt-j h5,
				.es-m-txt-j h6 {
					text-align: justify !important;
				}
				.es-m-txt-l,
				.es-m-txt-l h1,
				.es-m-txt-l h2,
				.es-m-txt-l h3,
				.es-m-txt-l h4,
				.es-m-txt-l h5,
				.es-m-txt-l h6 {
					text-align: left !important;
				}
				.es-m-txt-r img,
				.es-m-txt-c img,
				.es-m-txt-l img {
					display: inline !important;
				}
				.es-m-txt-r .rollover:hover .rollover-second,
				.es-m-txt-c .rollover:hover .rollover-second,
				.es-m-txt-l .rollover:hover .rollover-second {
					display: inline !important;
				}
				.es-m-txt-r .rollover div,
				.es-m-txt-c .rollover div,
				.es-m-txt-l .rollover div {
					line-height: 0 !important;
					font-size: 0 !important;
				}
				.es-spacer {
					display: inline-table;
				}
				a.es-button,
				button.es-button {
					font-size: 20px !important;
				}
				a.es-button,
				button.es-button {
					display: inline-block !important;
				}
				.es-button-border {
					display: inline-block !important;
				}
				.es-m-fw,
				.es-m-fw.es-fw,
				.es-m-fw .es-button {
					display: block !important;
				}
				.es-m-il,
				.es-m-il .es-button,
				.es-social,
				.es-social td,
				.es-menu {
					display: inline-block !important;
				}
				.es-adaptive table,
				.es-left,
				.es-right {
					width: 100% !important;
				}
				.es-content table,
				.es-header table,
				.es-footer table,
				.es-content,
				.es-footer,
				.es-header {
					width: 100% !important;
					max-width: 600px !important;
				}
				.adapt-img {
					width: 100% !important;
					height: auto !important;
				}
				.es-mobile-hidden,
				.es-hidden {
					display: none !important;
				}
				.es-desk-hidden {
					width: auto !important;
					overflow: visible !important;
					float: none !important;
					max-height: inherit !important;
					line-height: inherit !important;
				}
				tr.es-desk-hidden {
					display: table-row !important;
				}
				table.es-desk-hidden {
					display: table !important;
				}
				td.es-desk-menu-hidden {
					display: table-cell !important;
				}
				.es-menu td {
					width: 1% !important;
				}
				table.es-table-not-adapt,
				.esd-block-html table {
					width: auto !important;
				}
				.es-social td {
					padding-bottom: 10px;
				}
				.h-auto {
					height: auto !important;
				}
			}
		</style>
	</head>
	<body style="width: 100%; height: 100%; padding: 0; margin: 0">
		<div class="es-wrapper-color" style="background-color: #bef9df">
			<!--[if gte mso 9]>
				<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
					<v:fill type="tile" color="#bef9df"></v:fill>
				</v:background>
			<![endif]-->
			<table
				class="es-wrapper"
				width="100%"
				cellspacing="0"
				cellpadding="0"
				style="
					mso-table-lspace: 0pt;
					mso-table-rspace: 0pt;
					border-collapse: collapse;
					border-spacing: 0px;
					padding: 0;
					margin: 0;
					width: 100%;
					height: 100%;
					background-repeat: repeat;
					background-position: center top;
					background-color: #bef9df;
				"
			>
				<tr>
					<td valign="top" style="padding: 0; margin: 0">
						<table
							cellpadding="0"
							cellspacing="0"
							class="es-header"
							align="center"
							style="
								mso-table-lspace: 0pt;
								mso-table-rspace: 0pt;
								border-collapse: collapse;
								border-spacing: 0px;
								width: 100%;
								table-layout: fixed !important;
								background-color: transparent;
								background-repeat: repeat;
								background-position: center top;
							"
						>
							<tr>
								<td
									align="center"
									bgcolor="#6fa8dc"
									style="padding: 0; margin: 0; background-color: #6fa8dc"
								>
									<table
										bgcolor="#ffffff"
										class="es-header-body"
										align="center"
										cellpadding="0"
										cellspacing="0"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											border-collapse: collapse;
											border-spacing: 0px;
											background-color: #ffffff;
											width: 600px;
										"
									>
										<tr>
											<td
												align="left"
												style="
													margin: 0;
													padding-top: 20px;
													padding-right: 20px;
													padding-bottom: 10px;
													padding-left: 20px;
												"
											>
												<!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:426px" valign="top"><![endif]-->
												<table
													cellpadding="0"
													cellspacing="0"
													align="left"
													class="es-left"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
														float: left;
													"
												>
													<tr>
														<td
															class="es-m-p0r"
															valign="top"
															align="center"
															style="padding: 0; margin: 0; width: 426px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td
																		align="left"
																		class="es-m-p25b es-m-txt-c"
																		style="padding: 0; margin: 0; font-size: 0px"
																	>
																		<img
																			src="https://qmcoiq.stripocdn.email/content/guids/CABINET_2e3dd02197f7d4f34dbe35a7056967a350706df4bf230ff7feaf33ba90fcd7d1/images/icon.png"
																			style="
																				display: block;
																				font-size: 14px;
																				border: 0;
																				outline: none;
																				text-decoration: none;
																			"
																			width="50"
																		/>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
												<!--[if mso]></td><td style="width:30px"></td><td style="width:104px" valign="top"><![endif]-->
												<table
													cellpadding="0"
													cellspacing="0"
													class="es-right"
													align="right"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
														float: right;
													"
												>
													<tr>
														<td
															align="left"
															style="padding: 0; margin: 0; width: 104px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td align="left" style="padding: 0; margin: 0">
																		<h1
																			style="
																				margin: 0;
																				font-family: 'merriweather sans',
																					'helvetica neue', helvetica, arial,
																					sans-serif;
																				mso-line-height-rule: exactly;
																				letter-spacing: 0;
																				font-size: 36px;
																				font-style: normal;
																				font-weight: normal;
																				line-height: 43px;
																				color: #666666;
																			"
																		>
																			Safarny
																		</h1>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
												<!--[if mso]></td></tr></table><![endif]-->
											</td>
										</tr>
										<tr>
											<td align="left" style="padding: 0; margin: 0">
												<table
													cellpadding="0"
													cellspacing="0"
													width="100%"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
													"
												>
													<tr>
														<td
															class="es-m-p0r"
															valign="top"
															align="center"
															style="padding: 0; margin: 0; width: 600px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td
																		align="center"
																		style="padding: 0; margin: 0; font-size: 0"
																	>
																		<table
																			border="0"
																			width="100%"
																			height="100%"
																			cellpadding="0"
																			cellspacing="0"
																			role="presentation"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																				border-collapse: collapse;
																				border-spacing: 0px;
																			"
																		>
																			<tr>
																				<td
																					style="
																						padding: 0;
																						margin: 0;
																						border-bottom: 1px solid #00b59c;
																						background: none;
																						height: 1px;
																						width: 100%;
																						margin: 0px;
																					"
																				></td>
																			</tr>
																		</table>
																	</td>
																</tr>
																<tr>
																	<td
																		align="center"
																		style="padding: 0; margin: 0; font-size: 0"
																	>
																		<table
																			border="0"
																			width="100%"
																			height="100%"
																			cellpadding="0"
																			cellspacing="0"
																			role="presentation"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																				border-collapse: collapse;
																				border-spacing: 0px;
																			"
																		>
																			<tr>
																				<td
																					style="
																						padding: 0;
																						margin: 0;
																						border-bottom: 1px solid #00b59c;
																						background: none;
																						height: 1px;
																						width: 100%;
																						margin: 0px;
																					"
																				></td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
						<table
							class="es-content"
							cellspacing="0"
							cellpadding="0"
							align="center"
							style="
								mso-table-lspace: 0pt;
								mso-table-rspace: 0pt;
								border-collapse: collapse;
								border-spacing: 0px;
								width: 100%;
								table-layout: fixed !important;
							"
						>
							<tr>
								<td
									align="center"
									bgcolor="#6fa8dc"
									style="padding: 0; margin: 0; background-color: #6fa8dc"
								>
									<table
										class="es-content-body"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											border-collapse: collapse;
											border-spacing: 0px;
											background-color: #ffffff;
											width: 600px;
										"
										cellspacing="0"
										cellpadding="0"
										bgcolor="#ffffff"
										align="center"
									>
										<tr>
											<td align="left" style="padding: 0; margin: 0">
												<table
													width="100%"
													cellspacing="0"
													cellpadding="0"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
													"
												>
													<tr>
														<td
															class="es-m-p0r es-m-p20b"
															valign="top"
															align="center"
															style="padding: 0; margin: 0; width: 600px"
														>
															<table
																width="100%"
																cellspacing="0"
																cellpadding="0"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td
																		align="center"
																		style="padding: 0; margin: 0; font-size: 0px"
																	>
																		<img
																			class="adapt-img"
																			src="https://qmcoiq.stripocdn.email/content/guids/CABINET_2e3dd02197f7d4f34dbe35a7056967a350706df4bf230ff7feaf33ba90fcd7d1/images/readytotravel.jpg"
																			alt="World Tourism Day"
																			style="
																				display: block;
																				font-size: 14px;
																				border: 0;
																				outline: none;
																				text-decoration: none;
																			"
																			width="600"
																			title="World Tourism Day"
																		/>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
						<table
							cellpadding="0"
							cellspacing="0"
							class="es-content"
							align="center"
							style="
								mso-table-lspace: 0pt;
								mso-table-rspace: 0pt;
								border-collapse: collapse;
								border-spacing: 0px;
								width: 100%;
								table-layout: fixed !important;
							"
						>
							<tr>
								<td
									align="center"
									bgcolor="#6fa8dc"
									style="padding: 0; margin: 0; background-color: #6fa8dc"
								>
									<table
										bgcolor="#ffffff"
										class="es-content-body"
										align="center"
										cellpadding="0"
										cellspacing="0"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											border-collapse: collapse;
											border-spacing: 0px;
											background-color: #ffffff;
											width: 600px;
										"
									>
										<tr>
											<td
												align="left"
												style="
													padding: 0;
													margin: 0;
													padding-right: 20px;
													padding-left: 20px;
												"
											>
												<table
													cellpadding="0"
													cellspacing="0"
													width="100%"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
													"
												>
													<tr>
														<td
															align="center"
															valign="top"
															style="padding: 0; margin: 0; width: 560px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td
																		align="center"
																		style="
																			padding: 0;
																			margin: 0;
																			padding-top: 20px;
																			padding-bottom: 20px;
																			font-size: 0;
																		"
																	>
																		<table
																			border="0"
																			width="100%"
																			height="100%"
																			cellpadding="0"
																			cellspacing="0"
																			role="presentation"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																				border-collapse: collapse;
																				border-spacing: 0px;
																			"
																		>
																			<tr>
																				<td
																					style="
																						padding: 0;
																						margin: 0;
																						border-bottom: 1px solid #00b59c;
																						background: none;
																						height: 1px;
																						width: 100%;
																						margin: 0px;
																					"
																				></td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<td
												align="left"
												style="
													padding: 0;
													margin: 0;
													padding-top: 20px;
													padding-right: 20px;
													padding-left: 20px;
												"
											>
												<table
													cellpadding="0"
													cellspacing="0"
													width="100%"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
													"
												>
													<tr>
														<td
															align="center"
															valign="top"
															style="padding: 0; margin: 0; width: 560px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td
																		align="center"
																		class="es-m-txt-l"
																		style="
																			padding: 0;
																			margin: 0;
																			padding-top: 10px;
																		"
																	>
                                  ${dynamicText}
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<td
												align="left"
												style="padding: 0; margin: 0; padding-right: 20px"
											>
												<table
													cellpadding="0"
													cellspacing="0"
													width="100%"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
													"
												>
													<tr>
														<td
															align="left"
															style="padding: 0; margin: 0; width: 580px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td align="left" style="padding: 0; margin: 0">
																		<p
																			style="
																				margin: 0;
																				mso-line-height-rule: exactly;
																				font-family: arial, 'helvetica neue',
																					helvetica, sans-serif;
																				line-height: 21px;
																				letter-spacing: 0;
																				color: #333333;
																				font-size: 14px;
																			"
																		>
																			​
																		</p>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<td
												align="left"
												style="
													padding: 0;
													margin: 0;
													padding-right: 20px;
													padding-left: 20px;
												"
											>
												<table
													cellpadding="0"
													cellspacing="0"
													width="100%"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
													"
												>
													<tr>
														<td
															align="center"
															valign="top"
															style="padding: 0; margin: 0; width: 560px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td align="center" style="padding: 0; margin: 0">
																		<span
																			class="es-button-border"
																			style="
																				border-style: solid;
																				border-color: #2cb543;
																				background: #0b5394;
																				border-width: 0px;
																				display: inline-block;
																				border-radius: 100px;
																				width: auto;
																			"
																			><a
																				href="http://localhost:3001/"
																				class="es-button"
																				target="_blank"
																				style="
																					mso-style-priority: 100 !important;
																					text-decoration: none !important;
																					mso-line-height-rule: exactly;
																					color: #ffffff;
																					font-size: 18px;
																					padding: 10px 20px;
																					display: inline-block;
																					background: #0b5394;
																					border-radius: 100px;
																					font-family: arvo, courier, georgia,
																						serif;
																					font-weight: normal;
																					font-style: normal;
																					line-height: 22px !important;
																					width: auto;
																					text-align: center;
																					letter-spacing: 0;
																					mso-padding-alt: 0;
																					mso-border-alt: 10px solid #0b5394;
																				"
																				>PLAN A TRIP NOW</a
																			></span
																		>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
						<table
							cellpadding="0"
							cellspacing="0"
							class="es-content"
							align="center"
							style="
								mso-table-lspace: 0pt;
								mso-table-rspace: 0pt;
								border-collapse: collapse;
								border-spacing: 0px;
								width: 100%;
								table-layout: fixed !important;
							"
						>
							<tr>
								<td
									align="center"
									bgcolor="#6fa8dc"
									style="padding: 0; margin: 0; background-color: #6fa8dc"
								>
									<table
										bgcolor="#ffd966"
										class="es-content-body"
										align="center"
										cellpadding="0"
										cellspacing="0"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											border-collapse: collapse;
											border-spacing: 0px;
											background-color: #ffd966;
											background-repeat: no-repeat;
											width: 600px;
											background-image: url(https://qmcoiq.stripocdn.email/content/guids/CABINET_9e63508df12cc8278fec1888cf4837c6/images/73301626870340374.jpg);
											background-position: center center;
										"
										background="https://qmcoiq.stripocdn.email/content/guids/CABINET_9e63508df12cc8278fec1888cf4837c6/images/73301626870340374.jpg"
									>
										<tr>
											<td
												align="left"
												background="https://qmcoiq.stripocdn.email/content/guids/CABINET_9e63508df12cc8278fec1888cf4837c6/images/86751614873402438.png"
												style="
													padding: 0;
													margin: 0;
													padding-top: 20px;
													padding-right: 20px;
													padding-left: 20px;
													background-image: url(https://qmcoiq.stripocdn.email/content/guids/CABINET_9e63508df12cc8278fec1888cf4837c6/images/86751614873402438.png);
													background-repeat: no-repeat;
													background-position: center top;
												"
											>
												<table
													cellpadding="0"
													cellspacing="0"
													width="100%"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
													"
												>
													<tr>
														<td
															align="center"
															valign="top"
															style="padding: 0; margin: 0; width: 560px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td
																		align="center"
																		style="padding: 15px; margin: 0"
																	>
																		<h2
																			style="
																				margin: 0;
																				font-family: lora, georgia,
																					'times new roman', serif;
																				mso-line-height-rule: exactly;
																				letter-spacing: 0;
																				font-size: 26px;
																				font-style: normal;
																				font-weight: bold;
																				line-height: 31px;
																				color: #ffffff;
																			"
																		>
																			Find the right travel plan
																		</h2>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<td
												align="left"
												style="
													margin: 0;
													padding-top: 20px;
													padding-right: 20px;
													padding-left: 20px;
													padding-bottom: 30px;
												"
											>
												<!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:194px" valign="top"><![endif]-->
												<table
													cellpadding="0"
													cellspacing="0"
													align="left"
													class="es-left"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
														float: left;
													"
												>
													<tr>
														<td
															align="left"
															class="es-m-p20b"
															style="padding: 0; margin: 0; width: 174px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																bgcolor="#f0fbf4"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: separate;
																	border-spacing: 0px;
																	background-color: #f0fbf4;
																	border-radius: 5px;
																"
																role="presentation"
															>
																<tr>
																	<td
																		align="left"
																		style="padding: 10px; margin: 0"
																	>
																		<h3
																			style="
																				margin: 0;
																				font-family: lora, georgia,
																					'times new roman', serif;
																				mso-line-height-rule: exactly;
																				letter-spacing: 0;
																				font-size: 20px;
																				font-style: normal;
																				font-weight: normal;
																				line-height: 24px;
																				color: #666666;
																			"
																		>
																			<strong>BOOK ANYWHERE</strong>
																		</h3>
																	</td>
																</tr>
																<tr>
																	<td
																		align="left"
																		style="padding: 10px; margin: 0"
																	>
																		<p
																			style="
																				margin: 0;
																				mso-line-height-rule: exactly;
																				font-family: arial, 'helvetica neue',
																					helvetica, sans-serif;
																				line-height: 21px;
																				letter-spacing: 0;
																				color: #333333;
																				font-size: 14px;
																			"
																		>
																			Book your dream getaway effortlessly,
																			anywhere, and anytime! With our website,
																			you have the power to explore the world's
																			most incredible destinations.
																		</p>
																	</td>
																</tr>
																<tr>
																	<td align="center" style="padding: 0; margin: 0">
																		<span
																			class="es-button-border"
																			style="
																				border-style: solid;
																				border-color: #2cb543;
																				background: #00b59c;
																				border-width: 0px;
																				display: block;
																				border-radius: 0 0 5px 5px;
																				width: auto;
																			"
																			><a
																				href="http://localhost:3001/"
																				class="es-button"
																				target="_blank"
																				style="
																					mso-style-priority: 100 !important;
																					text-decoration: none !important;
																					mso-line-height-rule: exactly;
																					color: #ffffff;
																					font-size: 18px;
																					padding: 10px 20px 10px 20px;
																					display: block;
																					background: #00b59c;
																					border-radius: 6px;
																					font-family: arial, 'helvetica neue',
																						helvetica, sans-serif;
																					font-weight: normal;
																					font-style: normal;
																					line-height: 22px !important;
																					width: auto;
																					text-align: center;
																					letter-spacing: 0;
																					mso-padding-alt: 0;
																					mso-border-alt: 10px solid #00b59c;
																					border-left-width: 20px;
																					border-right-width: 20px;
																				"
																				>Learn more</a
																			></span
																		>
																	</td>
																</tr>
															</table>
														</td>
														<td
															class="es-hidden"
															style="padding: 0; margin: 0; width: 20px"
														></td>
													</tr>
												</table>
												<!--[if mso]></td><td style="width:174px" valign="top"><![endif]-->
												<table
													cellpadding="0"
													cellspacing="0"
													class="es-left"
													align="left"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
														float: left;
													"
												>
													<tr>
														<td
															align="left"
															style="padding: 0; margin: 0; width: 174px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																bgcolor="#f0fbf4"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: separate;
																	border-spacing: 0px;
																	background-color: #f0fbf4;
																	border-radius: 5px;
																"
																role="presentation"
															>
																<tr>
																	<td
																		align="left"
																		style="padding: 10px; margin: 0"
																	>
																		<h3
																			style="
																				margin: 0;
																				font-family: lora, georgia,
																					'times new roman', serif;
																				mso-line-height-rule: exactly;
																				letter-spacing: 0;
																				font-size: 20px;
																				font-style: normal;
																				font-weight: normal;
																				line-height: 24px;
																				color: #666666;
																			"
																		>
																			<strong>OUR GUIDES</strong>
																		</h3>
																	</td>
																</tr>
																<tr>
																	<td
																		align="left"
																		style="padding: 10px; margin: 0"
																	>
																		<p
																			style="
																				margin: 0;
																				mso-line-height-rule: exactly;
																				font-family: arial, 'helvetica neue',
																					helvetica, sans-serif;
																				line-height: 21px;
																				letter-spacing: 0;
																				color: #333333;
																				font-size: 14px;
																			"
																		>
																			Discover incredible adventures with our
																			expert guides! At Safarny, we pride
																			ourselves on offering top-notch guides who
																			are passionate about turning your trips
																			into unforgettable experiences.
																		</p>
																	</td>
																</tr>
																<tr>
																	<td align="center" style="padding: 0; margin: 0">
																		<span
																			class="es-button-border"
																			style="
																				border-style: solid;
																				border-color: #2cb543;
																				background: #00b59c;
																				border-width: 0px;
																				display: block;
																				border-radius: 0 0 5px 5px;
																				width: auto;
																			"
																			><a
																				href="http://localhost:3001/"
																				class="es-button"
																				target="_blank"
																				style="
																					mso-style-priority: 100 !important;
																					text-decoration: none !important;
																					mso-line-height-rule: exactly;
																					color: #ffffff;
																					font-size: 18px;
																					padding: 10px 20px 10px 20px;
																					display: block;
																					background: #00b59c;
																					border-radius: 5px;
																					font-family: arial, 'helvetica neue',
																						helvetica, sans-serif;
																					font-weight: normal;
																					font-style: normal;
																					line-height: 22px !important;
																					width: auto;
																					text-align: center;
																					letter-spacing: 0;
																					mso-padding-alt: 0;
																					mso-border-alt: 10px solid #00b59c;
																					border-left-width: 20px;
																					border-right-width: 20px;
																				"
																				>Learn more</a
																			></span
																		>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
												<!--[if mso]></td><td style="width:20px"></td><td style="width:172px" valign="top"><![endif]-->
												<table
													cellpadding="0"
													cellspacing="0"
													class="es-right"
													align="right"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
														float: right;
													"
												>
													<tr class="es-mobile-hidden">
														<td
															align="left"
															style="padding: 0; margin: 0; width: 172px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																bgcolor="#f0fbf4"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: separate;
																	border-spacing: 0px;
																	background-color: #f0fbf4;
																	border-radius: 5px;
																"
																role="presentation"
															>
																<tr>
																	<td
																		align="left"
																		style="padding: 10px; margin: 0"
																	>
																		<h3
																			style="
																				margin: 0;
																				font-family: lora, georgia,
																					'times new roman', serif;
																				mso-line-height-rule: exactly;
																				letter-spacing: 0;
																				font-size: 20px;
																				font-style: normal;
																				font-weight: normal;
																				line-height: 24px;
																				color: #666666;
																			"
																		>
																			<strong>USE OUR AI</strong>
																		</h3>
																	</td>
																</tr>
																<tr>
																	<td
																		align="left"
																		style="padding: 10px; margin: 0"
																	>
																		<p
																			style="
																				margin: 0;
																				mso-line-height-rule: exactly;
																				font-family: arial, 'helvetica neue',
																					helvetica, sans-serif;
																				line-height: 21px;
																				letter-spacing: 0;
																				color: #333333;
																				font-size: 14px;
																			"
																		>
																			Meet our Travel AI: Your personal travel
																			expert! Get tailored travel plans
																			effortlessly, driven by your interests and
																			budget. Start your journey now!
																		</p>
																	</td>
																</tr>
																<tr>
																	<td align="center" style="padding: 0; margin: 0">
																		<span
																			class="es-button-border"
																			style="
																				border-style: solid;
																				border-color: #2cb543;
																				background: #00b59c;
																				border-width: 0px;
																				display: block;
																				border-radius: 0 0 5px 5px;
																				width: auto;
																			"
																			><a
																				href="http://localhost:3001/"
																				class="es-button"
																				target="_blank"
																				style="
																					mso-style-priority: 100 !important;
																					text-decoration: none !important;
																					mso-line-height-rule: exactly;
																					color: #ffffff;
																					font-size: 18px;
																					padding: 10px 20px 10px 20px;
																					display: block;
																					background: #00b59c;
																					border-radius: 5px;
																					font-family: arial, 'helvetica neue',
																						helvetica, sans-serif;
																					font-weight: normal;
																					font-style: normal;
																					line-height: 22px !important;
																					width: auto;
																					text-align: center;
																					letter-spacing: 0;
																					mso-padding-alt: 0;
																					mso-border-alt: 10px solid #00b59c;
																					border-left-width: 20px;
																					border-right-width: 20px;
																				"
																				>Learn more</a
																			></span
																		>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
												<!--[if mso]></td></tr></table><![endif]-->
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
						<table
							cellpadding="0"
							cellspacing="0"
							class="es-footer"
							align="center"
							style="
								mso-table-lspace: 0pt;
								mso-table-rspace: 0pt;
								border-collapse: collapse;
								border-spacing: 0px;
								width: 100%;
								table-layout: fixed !important;
								background-color: transparent;
								background-repeat: repeat;
								background-position: center top;
							"
						>
							<tr>
								<td
									align="center"
									bgcolor="#6fa8dc"
									style="padding: 0; margin: 0; background-color: #6fa8dc"
								>
									<table
										bgcolor="#ffffff"
										class="es-footer-body"
										align="center"
										cellpadding="0"
										cellspacing="0"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											border-collapse: collapse;
											border-spacing: 0px;
											background-color: #03322b;
											width: 600px;
										"
									>
										<tr>
											<td
												align="left"
												bgcolor="#0b5394"
												style="
													margin: 0;
													padding-right: 20px;
													padding-left: 20px;
													padding-bottom: 30px;
													padding-top: 30px;
													background-color: #0b5394;
												"
											>
												<!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:250px" valign="top"><![endif]-->
												<table
													cellpadding="0"
													cellspacing="0"
													align="left"
													class="es-left"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
														float: left;
													"
												>
													<tr>
														<td
															class="es-m-p20b"
															align="center"
															valign="top"
															style="padding: 0; margin: 0; width: 210px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td
																		align="left"
																		style="
																			padding: 0;
																			margin: 0;
																			padding-bottom: 5px;
																			font-size: 0px;
																		"
																	>
																		<img
																			src="https://qmcoiq.stripocdn.email/content/guids/CABINET_2e3dd02197f7d4f34dbe35a7056967a350706df4bf230ff7feaf33ba90fcd7d1/images/icon_MW8.png"
																			alt=""
																			style="
																				display: block;
																				font-size: 14px;
																				border: 0;
																				outline: none;
																				text-decoration: none;
																			"
																			width="35"
																		/>
																	</td>
																</tr>
																<tr>
																	<td align="left" style="padding: 0; margin: 0">
																		<p
																			style="
																				margin: 0;
																				mso-line-height-rule: exactly;
																				font-family: arial, 'helvetica neue',
																					helvetica, sans-serif;
																				line-height: 18px;
																				letter-spacing: 0;
																				color: #ffffff;
																				font-size: 12px;
																			"
																		>
																			Join us and go on amazing adventures
																		</p>
																	</td>
																</tr>
															</table>
														</td>
														<td
															class="es-hidden"
															style="padding: 0; margin: 0; width: 40px"
														></td>
													</tr>
												</table>
												<!--[if mso]></td><td style="width:135px" valign="top"><![endif]-->
												<table
													cellpadding="0"
													cellspacing="0"
													class="es-left"
													align="left"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
														float: left;
													"
												>
													<tr>
														<td
															align="left"
															style="padding: 0; margin: 0; width: 135px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td align="left" style="padding: 0; margin: 0">
																		<p
																			style="
																				margin: 0;
																				mso-line-height-rule: exactly;
																				font-family: arial, 'helvetica neue',
																					helvetica, sans-serif;
																				line-height: 21px;
																				letter-spacing: 0;
																				color: #ffffff;
																				font-size: 14px;
																			"
																		>
																			​
																		</p>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
												<!--[if mso]></td><td style="width:40px"></td><td style="width:135px" valign="top"><![endif]-->
												<table
													cellpadding="0"
													cellspacing="0"
													class="es-right"
													align="right"
													style="
														mso-table-lspace: 0pt;
														mso-table-rspace: 0pt;
														border-collapse: collapse;
														border-spacing: 0px;
														float: right;
													"
												>
													<tr>
														<td
															align="left"
															style="padding: 0; margin: 0; width: 135px"
														>
															<table
																cellpadding="0"
																cellspacing="0"
																width="100%"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	border-collapse: collapse;
																	border-spacing: 0px;
																"
															>
																<tr>
																	<td
																		align="left"
																		style="
																			padding: 0;
																			margin: 0;
																			padding-top: 5px;
																		"
																	>
																		<p
																			style="
																				margin: 0;
																				mso-line-height-rule: exactly;
																				font-family: arial, 'helvetica neue',
																					helvetica, sans-serif;
																				line-height: 21px;
																				letter-spacing: 0;
																				color: #ffffff;
																				font-size: 14px;
																			"
																		>
																			​
																		</p>
																	</td>
																</tr>
																<tr>
																	<td
																		align="left"
																		style="
																			padding: 0;
																			margin: 0;
																			padding-bottom: 5px;
																			padding-top: 15px;
																			font-size: 0;
																		"
																	>
																		<table
																			cellpadding="0"
																			cellspacing="0"
																			class="es-table-not-adapt es-social"
																			role="presentation"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																				border-collapse: collapse;
																				border-spacing: 0px;
																			"
																		>
																			<tr>
																				<td
																					align="center"
																					valign="top"
																					style="
																						padding: 0;
																						margin: 0;
																						padding-right: 15px;
																					"
																				>
																					<img
																						title="Facebook"
																						src="https://qmcoiq.stripocdn.email/content/assets/img/social-icons/circle-white-bordered/facebook-circle-white-bordered.png"
																						alt="Fb"
																						width="24"
																						height="24"
																						style="
																							display: block;
																							font-size: 14px;
																							border: 0;
																							outline: none;
																							text-decoration: none;
																						"
																					/>
																				</td>
																				<td
																					align="center"
																					valign="top"
																					style="
																						padding: 0;
																						margin: 0;
																						padding-right: 15px;
																					"
																				>
																					<a
																						target="_blank"
																						href="https://viewstripo.email"
																						style="
																							mso-line-height-rule: exactly;
																							text-decoration: underline;
																							color: #cccccc;
																							font-size: 14px;
																						"
																						><img
																							title="Instagram"
																							src="https://qmcoiq.stripocdn.email/content/assets/img/social-icons/circle-white-bordered/instagram-circle-white-bordered.png"
																							alt="Inst"
																							width="24"
																							height="24"
																							style="
																								display: block;
																								font-size: 14px;
																								border: 0;
																								outline: none;
																								text-decoration: none;
																							"
																					/></a>
																				</td>
																				<td
																					align="center"
																					valign="top"
																					style="padding: 0; margin: 0"
																				>
																					<a
																						target="_blank"
																						href="https://viewstripo.email"
																						style="
																							mso-line-height-rule: exactly;
																							text-decoration: underline;
																							color: #cccccc;
																							font-size: 14px;
																						"
																						><img
																							title="Youtube"
																							src="https://qmcoiq.stripocdn.email/content/assets/img/social-icons/circle-white-bordered/youtube-circle-white-bordered.png"
																							alt="Yt"
																							width="24"
																							height="24"
																							style="
																								display: block;
																								font-size: 14px;
																								border: 0;
																								outline: none;
																								text-decoration: none;
																							"
																					/></a>
																				</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
												<!--[if mso]></td></tr></table><![endif]-->
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>

   `;
};

// ${dynamicText}
